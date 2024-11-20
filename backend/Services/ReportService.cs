using backend.Data;
using backend.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services
{
    public class ReportService : IReportService
    {
        private readonly ApplicationDbContext _context;

        public ReportService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ServiceReportResult<List<StudentReportDto>>> GetStudentPerformanceReportsAsync()
        {
            var result = new ServiceReportResult<List<StudentReportDto>>();
            try
            {
                // Fetch the required data for students and their courses
                var students = await _context.Students
                    .Include(s => s.Enrollments)
                    .ThenInclude(e => e.Course) // Include only the course details
                    .Select(s => new StudentReportDto
                    {
                        StudentId = s.Id,
                        StudentName = s.Name,
                        Courses = s.Enrollments.Select(e => new CourseReportDto
                        {
                            CourseName = e.Course.Name,
                            Description = e.Course.Description
                        }).ToList()
                    })
                    .ToListAsync();

                if (students == null || students.Count == 0)
                {
                    result.Message = "No students found";
                    return result;
                }

                result.Success = true;
                result.Data = students;
            }
            catch (System.Exception ex)
            {
                result.Message = $"Error generating report: {ex.Message}";
            }

            return result;
        }
    }
}
