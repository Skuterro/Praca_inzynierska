using Api.Models.Entities;
using Api.Models.Requests.ExerciseRequests;
using Api.Models.Responses.ExerciseResponses;
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
}
