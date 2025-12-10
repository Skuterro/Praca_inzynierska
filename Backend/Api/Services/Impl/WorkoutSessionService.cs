using Api.Database;
using Api.Exceptions;
using Api.Models.Entities;
using Api.Models.Requests.QueryParams;
using Api.Models.Requests.WorkoutSessionRequests;
using Api.Models.Responses.ActiveSessionResponses;
using Api.Models.Responses.PagedResult;
using Api.Models.Responses.WorkoutSessionResponses;
using Api.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Impl
{
    public class WorkoutSessionService : IWorkoutSessionService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public WorkoutSessionService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<StartWorkoutSessionResponse> StartWorkoutSessionAsync(string userId, StartWorkoutSessionRequest request)
        {
            var workoutPlanDayExists = await _context.WorkoutPlanDays
                .FirstOrDefaultAsync(wpd => wpd.Id == request.WorkoutPlanDayId);

            if (workoutPlanDayExists == null)
            {
                throw new BadRequestException("Workout day does not exist");
            }

            var workoutSessionEntity = _mapper.Map<WorkoutSession>(request);
            workoutSessionEntity.UserId = userId;
            workoutSessionEntity.Start = DateTime.UtcNow;

            _context.WorkoutSessions.Add(workoutSessionEntity);
            await _context.SaveChangesAsync();

            return new StartWorkoutSessionResponse
            {
                SessionId = workoutSessionEntity.Id
            };
        }

        public async Task<WorkoutSessionSetResponse> AddSetAsync(string userId, AddWorkouSessionSetRequest request)
        {
            var workoutSession = await _context.WorkoutSessions
                .Include(ws => ws.SessionExercises)
                    .ThenInclude(se => se.Sets)
                .FirstOrDefaultAsync(ws => ws.Id == request.WorkoutSessionId);

            if (workoutSession == null)
            {
               throw new BadRequestException("Workout session does not exist");
            }

            if (workoutSession.UserId != userId)
            {
                throw new BadRequestException("User is not the owner of this workout session");
            }
            
            var workoutSessionExercise = workoutSession.SessionExercises.FirstOrDefault(se => se.DayExerciseId == request.DayExerciseId);
            if (workoutSessionExercise == null)
            {
                workoutSessionExercise = new WorkoutSessionExercise
                {
                    WorkoutSessionId = request.WorkoutSessionId,
                    DayExerciseId = request.DayExerciseId
                };

                _context.WorkoutSessionExercises.Add(workoutSessionExercise);
                await _context.SaveChangesAsync();
            }

            var workoutSessionSetEntity = _mapper.Map<WorkoutSessionSet>(request);
            workoutSessionSetEntity.WorkoutSessionExerciseId = workoutSessionExercise.Id;
      
            _context.WorkoutSessionSets.Add(workoutSessionSetEntity);
            await _context.SaveChangesAsync();

            return _mapper.Map<WorkoutSessionSetResponse>(workoutSessionSetEntity);
        }

        public async Task FinishWorkoutSessionAsync(string userId, FinishWorkoutSessionRequest request)
        {
            var workoutSession = await _context.WorkoutSessions
                .FirstOrDefaultAsync(ws => ws.Id == request.SessionId);

            if (workoutSession == null)
            {
                throw new BadRequestException("Workout session does not exist");
            }

            if (workoutSession.UserId != userId) 
            {
                throw new BadRequestException("User is not the owner of this workout session");
            }

            workoutSession.End = DateTime.UtcNow;
            workoutSession.IsFinished = true;
            await _context.SaveChangesAsync();
        }

        public async Task<SessionStatusResponse> GetTodaySessionStatusAsync(string userId)
        {
            var today = DateTime.UtcNow.Date;

            var lastSession = await _context.WorkoutSessions
                .Where(ws => ws.UserId == userId)
                .OrderByDescending(ws => ws.Start)
                .FirstOrDefaultAsync();

            if (lastSession == null)
            {
                return new SessionStatusResponse
                {
                    Status = SessionStatusEnum.StartWorkout
                };
            }

            if (!lastSession.IsFinished && lastSession.Start.Date < today) 
            {
                lastSession.End = DateTime.UtcNow;
                lastSession.IsFinished = true;
                await _context.SaveChangesAsync();

                return new SessionStatusResponse
                {
                    Status = SessionStatusEnum.StartWorkout
                };
            }

            if (lastSession.Start.Date == today)
            {
                if (!lastSession.IsFinished)
                {
                    return new SessionStatusResponse
                    {
                        Status = SessionStatusEnum.ContinueWorkout,
                        SessionId = lastSession.Id
                    };
                }
                else
                {
                    return new SessionStatusResponse
                    {
                        Status = SessionStatusEnum.FinishedWorkout
                    };
                }
            }

            return new SessionStatusResponse
            {
                Status = SessionStatusEnum.StartWorkout
            };
        }

        public async Task<PagedResult<WorkoutSessionResponse>> GetAllUserWorkoutSessionsAsync(string userId, QueryParams queryParams)
        {
            var baseQuery = _context.WorkoutSessions
                .Where(ws => ws.UserId == userId)
                .OrderByDescending(ws => ws.Start)
                .Include(ws => ws.WorkoutPlanDay)
                    .ThenInclude(wpd => wpd.WorkoutPlan) 
                .AsQueryable();

            var totalItemsCount = await baseQuery.CountAsync();

            var workoutSessions = await baseQuery
                .Skip(queryParams.PageSize * (queryParams.PageNumber - 1))
                .Take(queryParams.PageSize)
                .ToListAsync();

            var response = _mapper.Map<List<WorkoutSessionResponse>>(workoutSessions);

            return new PagedResult<WorkoutSessionResponse>(response, totalItemsCount, queryParams.PageNumber, queryParams.PageSize);
        }

        public async Task<WorkoutSessionDetailsResponse> GetWorkoutSessionDetailsByIdAsync(string userId, int sessionId)
        {
            var workoutSession = await _context.WorkoutSessions
                .Where(ws => ws.Id == sessionId && ws.UserId == userId)
                .Include(ws => ws.SessionExercises)
                    .ThenInclude(se => se.Sets)
                .Include(ws => ws.SessionExercises)
                    .ThenInclude(se => se.DayExercise)
                        .ThenInclude(de => de.Exercise)
                .FirstOrDefaultAsync();

            if (workoutSession == null)
            {
                throw new NotFoundException("Workout session does not exist or user is not the owner");
            }

            return new WorkoutSessionDetailsResponse
            {
                SessionId = workoutSession.Id,
                IsFinished = workoutSession.IsFinished,
                Exercises = workoutSession.SessionExercises.Select(se => new WorkoutSessionExerciseResponse
                {
                    DayExerciseId = se.DayExerciseId,
                    Sets = se.Sets
                        .OrderBy(s => s.SetNumber)
                        .Select(s => new WorkoutSessionSetResponse
                        {
                            SetNumber = s.SetNumber,
                            Reps = s.Reps,
                            WeightKg = s.WeightKg
                        }).ToList()
                }).ToList()
            };
        }
    }
}
