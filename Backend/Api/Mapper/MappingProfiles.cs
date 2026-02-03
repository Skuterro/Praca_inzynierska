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
            CreateMap<CreateExerciseRequest, Exercise>();
            CreateMap<Exercise, ExerciseResponse>();
        }
    }

    public class DayExerciseMappingProfile : Profile
    {
        public DayExerciseMappingProfile()
        {
            CreateMap<DayExercise, DayExerciseResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ExerciseId))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Exercise.Name))
                .ForMember(dest => dest.BodyPart, opt => opt.MapFrom(src => src.Exercise.BodyPart));
        }
    }

    public class WorkoutPlanMappingProfile : Profile
    {
        public WorkoutPlanMappingProfile()
        {
            CreateMap<CreateWorkoutPlanRequest, WorkoutPlan>()
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore());

            CreateMap<CreateWorkoutPlanDayRequest, WorkoutPlanDay>()
                .ForMember(dest => dest.WeekDay, opt => opt.MapFrom(src => Enum.Parse<WeekDayEnum>(src.WeekDay, true)));

            CreateMap<CreateDayExerciseRequest, DayExercise>();

            CreateMap<WorkoutPlan, WorkoutPlanResponse>();
            CreateMap<WorkoutPlanDay, SimpleWorkoutPlanDayResponse>();

            CreateMap<WorkoutPlanDay, WorkoutPlanDayResponse>()
                .ForMember(dest => dest.DayExercises, opt => opt.MapFrom(src => src.DayExercises));

            CreateMap<DayExercise, DayExerciseResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Exercise.Name))
                .ForMember(dest => dest.BodyPart, opt => opt.MapFrom(src => src.Exercise.BodyPart));
        }
    }

    public class BodyMeasurementMappingProfile : Profile
    {
        public BodyMeasurementMappingProfile() 
        {
            CreateMap<CreateBodyMeasurementsRequest, BodyMeasurements>()
                .ForMember(dest => dest.UserId, opt => opt.Ignore());

            CreateMap<UpdateBodyMeasurementsRequest, BodyMeasurements>()
                .ForAllMembers(opt =>
                    opt.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<BodyMeasurements, BodyMeasurementsResponse>();
        }
    }

    public class PersonalRecordMappingProfile : Profile
    {
        public PersonalRecordMappingProfile()
        {
            CreateMap<PersonalRecordRequest, PersonalRecord>()
                .ForMember(dest => dest.Date, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore());

            CreateMap<PersonalRecord, PersonalRecordResponse>();
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

            CreateMap<WorkoutSession, WorkoutSessionResponse>()
                .ForMember(dest => dest.WorkoutPlanName, opt => opt.MapFrom(src => src.WorkoutPlanDay.WorkoutPlan.Name))
                .ForMember(dest => dest.WorkoutPlanDayName, opt => opt.MapFrom(src => src.WorkoutPlanDay.Name));

            CreateMap<AddWorkouSessionSetRequest, WorkoutSessionSet>()
                .ForMember(dest => dest.WorkoutSessionExerciseId, opt => opt.Ignore());

            CreateMap<WorkoutSessionSet, WorkoutSessionSetResponse>();
        }
    }
}
