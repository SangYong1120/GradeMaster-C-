/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useGetReportQuery } from "../../redux/features/reportAPI";
import { Col, Row, Card, CardBody } from "reactstrap";
import FullScreenLoader from "../../components/FullScreenLoader";
import { getDateFormat } from "../../helper/helper";

const Report = () => {
    const { data: reportData, refetch, isLoading } = useGetReportQuery();

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <>
            {isLoading ? (
                <FullScreenLoader />
            ) : (
                <div className="container main-content">
                    <Row className="my-3">
                        <Col>
                            <h2 className="main-title">Student Performance Reports</h2>
                        </Col>
                    </Row>

                    {reportData && reportData.length > 0 ? (
                        reportData.map((studentReport) => (
                            <Card key={studentReport.studentId} className="mb-4 shadow-sm" style={{ padding: '30px' }}>
                                <CardBody>
                                    {/* Student Information */}
                                    <Row className="mb-4">
                                        <Col>
                                            <h3 className="student-name">Student: {studentReport.studentName}</h3>
                                            <p><strong>Student ID:</strong> {studentReport.studentId}</p>
                                        </Col>
                                    </Row>

                                    {/* Courses Information */}
                                    {studentReport.courses && studentReport.courses.length > 0 ? (
                                        studentReport.courses.map((course, courseIndex) => (
                                            <div key={courseIndex} className="course-section mb-4">
                                                <h4 className="course-name">Course: {course.courseName}</h4>
                                                <p><strong>Course Description:</strong> {course.description}</p>

                                                {/* Attendance Section */}
                                                <div className="attendance-section mb-3">
                                                    <h5 className="section-title">Attendance</h5>
                                                    {course.attendanceRecords && course.attendanceRecords.length > 0 ? (
                                                        <ul>
                                                            {course.attendanceRecords.map((record, index) => (
                                                                <li key={index}>
                                                                    <p><strong>Date:</strong> {getDateFormat(record.date)}</p>
                                                                    <p><strong>Status:</strong> {record.status}</p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p>No attendance records available</p>
                                                    )}
                                                </div>

                                                {/* Tasks and Grades Section */}
                                                <div className="tasks-section mb-3">
                                                    <h5 className="section-title">Task Submissions</h5>
                                                    {course.taskSubmissions && course.taskSubmissions.length > 0 ? (
                                                        <ul>
                                                            {course.taskSubmissions.map((task, index) => (
                                                                <li key={index}>
                                                                    <p><strong>Task ID:</strong> {task.taskId}</p>
                                                                    <p><strong>Grade:</strong> {task.grade}</p>
                                                                    <p><strong>Submission Date:</strong> {getDateFormat(task.submissionDate)}</p>
                                                                    <p><strong>Feedback:</strong> {task.feedback || 'No feedback'}</p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p>No task submissions available</p>
                                                    )}
                                                </div>

                                                {/* Overall Grade Section */}
                                                <div className="grades-section">
                                                    <h5 className="section-title">Total Grade: {course.totalGrade || 'N/A'}</h5>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No courses available for this student.</p>
                                    )}
                                </CardBody>
                            </Card>
                        ))
                    ) : (
                        <Card>
                            <CardBody>
                                <p>No report data available</p>
                            </CardBody>
                        </Card>
                    )}
                </div>
            )}
        </>
    );
};

export default Report;
