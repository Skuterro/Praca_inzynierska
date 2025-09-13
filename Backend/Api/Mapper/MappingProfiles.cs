using System.Formats.Tar;
using Api.Models.Entities;
using Api.Models.Requests.BodyMeasurementRequests;
using Api.Models.Requests.ExerciseRequests;
using Api.Models.Requests.WorkoutPlanRequests;
using Api.Models.Responses.BodyMeasurementResponses;
using Api.Models.Responses.ExerciseResponses;
using Api.Models.Responses.WorkoutPlanResponses;
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

    public class WorkoutPlanMappingProfile : Profile
    {
        public WorkoutPlanMappingProfile()
        {
            CreateMap<WorkoutPlanCreateDto, WorkoutPlan>()
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.WorkoutPlanDays, opt => opt.MapFrom(src => src.WorkoutDays));

            CreateMap<WorkoutPlanDayCreateDto, WorkoutPlanDay>()
                .ForMember(dest => dest.WeekDay, opt => opt.MapFrom(src => Enum.Parse<WeekDay>(src.WeekDay, true)))
                .ForMember(dest => dest.DayExercises, opt => opt.MapFrom(src => src.DayExercises));

            CreateMap<DayExerciseCreateDto, DayExercise>();

            CreateMap<WorkoutPlan, WorkoutPlanResponseDto>();
            CreateMap<WorkoutPlanDay, WorkoutPlanDayResponseDto>();
            CreateMap<DayExercise, DayExerciseResponseDto>()
                .ForMember(dest => dest.ExerciseName, opt =>opt.MapFrom(src => src.Exercise.Name));
        }
    }

    public class BodyMeasurementMappingprofile : Profile
    {
        public BodyMeasurementMappingprofile() 
        {
            CreateMap<BodyMeasurementCreateDto, BodyMeasurement>()
                .ForMember(dest => dest.MeasurementDate, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore());

            CreateMap<BodyMeasurement, BodyMeasurementResponseDto>();
        }
    }
}
