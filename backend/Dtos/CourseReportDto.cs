using backend.Models;

namespace backend.Dtos
{
    public class CourseReportDto
    {
        public string CourseName { get; set; }
        public List<Attendance> AttendanceRecords { get; set; }
        public List<TaskSubmission> TaskSubmissions { get; set; }
        public int TotalGrade { get; set; }
        public List<GradeWeight> GradeWeights { get; set; }
        public string Description { get; internal set; }
    }
}
