using System.Formats.Tar;
using Api.Models.Entities;
using Api.Models.Requests.BodyMeasurementRequests;
using Api.Models.Requests.ExerciseRequests;
using Api.Models.Requests.OneRepMaxRequests;
using Api.Models.Requests.WorkoutPlanRequests;
using Api.Models.Requests.WorkoutSessionRequests;
using Api.Models.Responses.BodyMeasurementResponses;
using Api.Models.Responses.ExerciseResponses;
using Api.Models.Responses.OneRepMaxResponses;
using Api.Models.Responses.WorkoutPlanResponses;
using Api.Models.Responses.WorkoutSessionResponses;
using AutoMapper;

namespace Api.Mapper
{
    public class ExerciseMappingProfile : Profile
    {
        public ExerciseMappingProfile()
        {
            CreateMap<ExerciseCreateDto, Exercise>();
            CreateMap<Exercise, ExerciseResponseDto>();
        }
    }

    public class DayExerciseMappingProfile : Profile
    {
        public DayExerciseMappingProfile()
        {
            CreateMap<DayExercise, DayExerciseResponseDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ExerciseId))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Exercise.Name))
                .ForMember(dest => dest.BodyPart, opt => opt.MapFrom(src => src.Exercise.BodyPart));
        }
    }


    public class WorkoutPlanMappingProfile : Profile
    {
        public WorkoutPlanMappingProfile()
        {
            CreateMap<WorkoutPlanCreateDto, WorkoutPlan>()
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore());
            //.ForMember(dest => dest.WorkoutPlanDays, opt => opt.MapFrom(src => src.WorkoutDays));

            CreateMap<WorkoutPlanDayCreateDto, WorkoutPlanDay>()
                .ForMember(dest => dest.WeekDay, opt => opt.MapFrom(src => Enum.Parse<WeekDayEnum>(src.WeekDay, true)));
                //.ForMember(dest => dest.DayExercises, opt => opt.MapFrom(src => src.DayExercises));

            CreateMap<DayExerciseCreateDto, DayExercise>();

            CreateMap<WorkoutPlan, WorkoutPlanResponseDto>();
            CreateMap<WorkoutPlanDay, SimpleWorkoutPlanDayResponseDto>();

            CreateMap<WorkoutPlanDay, WorkoutPlanDayResponseDto>()
                .ForMember(dest => dest.DayExercises, opt => opt.MapFrom(src => src.DayExercises));

            CreateMap<DayExercise, DayExerciseResponseDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ExerciseId))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Exercise.Name))
                .ForMember(dest => dest.BodyPart, opt => opt.MapFrom(src => src.Exercise.BodyPart));
        }
    }

    public class BodyMeasurementMappingProfile : Profile
    {
        public BodyMeasurementMappingProfile() 
        {
            CreateMap<BodyMeasurementCreateDto, BodyMeasurement>()
                .ForMember(dest => dest.MeasurementDate, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore());

            CreateMap<BodyMeasurement, BodyMeasurementResponseDto>();
        }
    }

    public class OneRepMaxMappingProfile : Profile
    {
        public OneRepMaxMappingProfile()
        {
            CreateMap<CreateOneRepMaxRequest, OneRepMax>()
                .ForMember(dest => dest.Date, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore());

            CreateMap<OneRepMax, OneRepMaxResponse>();
        }
    }

    public class WorkoutSessionMappingProfie : Profile
    {
        public WorkoutSessionMappingProfie()
        {
            CreateMap<StartWorkoutSessionRequest, WorkoutSession>()
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.Start, opt => opt.Ignore())
                .ForMember(dest => dest.End, opt => opt.Ignore())
                .ForMember(dest => dest.IsFinished, opt => opt.Ignore());

            /*CreateMap<WorkoutSession, WorkoutSessionResponseDto>()
                .ForMember(dest => dest.WorkoutPlanDayName, opt => opt.MapFrom(src => src.WorkoutPlanDay.Name))
                .ForMember(dest => dest.Exercises, opt => opt.MapFrom(src =>
                    src.SessionSets
                        .GroupBy(s => new { s.ExerciseId, s.Exercise.Name })
                        .Select(g => new WorkoutSessionExerciseDto
                        {
                            ExerciseId = g.Key.ExerciseId,
                            ExerciseName = g.Key.Name,
                            Sets = g.Select(s => new SessionSetResponseDto
                            {
                                Id = s.Id,
                                SetNumber = s.SetNumber,
                                Reps = s.Reps,
                                WeightKg = s.WeightKg
                            }).ToList()
                        })
                        .ToList()
                ));*/

            CreateMap<WorkoutSession, WorkoutSessionResponse>()
                .ForMember(dest => dest.WorkoutPlanName, opt => opt.MapFrom(src => src.WorkoutPlanDay.WorkoutPlan.Name))
                .ForMember(dest => dest.WorkoutPlanDayName, opt => opt.MapFrom(src => src.WorkoutPlanDay.Name));

            CreateMap<AddWorkouSessionSetRequest, WorkoutSessionSet>()
                .ForMember(dest => dest.WorkoutSessionExerciseId, opt => opt.Ignore());

            CreateMap<WorkoutSessionSet, WorkoutSessionSetResponse>();
        }
    }
}
