/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Form, Label, Card, CardBody, Button } from "reactstrap";
import classnames from 'classnames';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import FullScreenLoader from "../../components/FullScreenLoader";
import { useGetStudentQuery, useUpdateStudentMutation } from "../../redux/features/studentAPI";
import { useGetCoursesQuery } from "../../redux/features/courseAPI";

const UpdateStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: student, refetch } = useGetStudentQuery(id);
    const { data: courses, isLoading: coursesLoading } = useGetCoursesQuery();  // Fetch available courses

    const {
        register,
        handleSubmit,
        setValue, // Use to populate the form
        watch,    // Use to track the value of fields
        formState: { errors }
    } = useForm({
        defaultValues: {
            courseIds: []  // Initialize with an empty array for multiple select
        }
    });

    // Fetch student data and populate form
    useEffect(() => {
        refetch();
    }, [refetch]);

    const [updateStudent, { isLoading, isError, error, isSuccess, data }] = useUpdateStudentMutation();

    // Populate form with student data and selected courses
    useEffect(() => {
        if (student) {
            const fields = ['name', 'email', 'phone', 'gender', 'address'];
    
            // Set all fields except dateOfBirth
            fields.forEach((field) => setValue(field, student[field]));
    
            // Format and set dateOfBirth if available
            if (student.dateOfBirth) {
                const formattedDate = new Date(student.dateOfBirth).toISOString().split('T')[0];  // Format date to YYYY-MM-DD
                setValue('dateOfBirth', formattedDate);
            }
    
            // Set courseIds as an array of selected course IDs
            const selectedCourseIds = student.courses ? student.courses.map(course => course.id) : [];
            setValue('courseIds', selectedCourseIds);
        }
    }, [student, setValue]);
    

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || 'Student updated successfully');
            navigate("/students");
        }

        if (isError) {
            const errorMsg = error?.data?.message || error?.data || 'Error occurred';
            toast.error(errorMsg, {
                position: 'top-right',
            });
        }
    }, [isSuccess, isError, isLoading]);

    const onSubmit = (formData) => {
        // Convert selected courses to array of course IDs
        formData.courseIds = formData.courseIds.map(courseId => parseInt(courseId));
        updateStudent({ id, student: formData });
    };

    return (
        <>
            {(isLoading || coursesLoading) ? (
                <FullScreenLoader />
            ) : (
                <div className="container main-content">
                    <Row className="my-3">
                        <Col>
                            <h4 className="main-title">Update Student</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Row>
                                            <Col md="6">
                                                <div className='mb-2'>
                                                    <Label>Student Name</Label>
                                                    <input
                                                        className={`form-control ${classnames({ 'is-invalid': errors.name })}`}
                                                        type="text"
                                                        id="name"
                                                        {...register('name', { required: true })}
                                                    />
                                                    {errors.name && <small className="text-danger">Student Name is required.</small>}
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className='mb-2'>
                                                    <Label>Email</Label>
                                                    <input
                                                        className={`form-control ${classnames({ 'is-invalid': errors.email })}`}
                                                        type="email"
                                                        id="email"
                                                        {...register('email', { required: true })}
                                                    />
                                                    {errors.email && <small className="text-danger">Email is required.</small>}
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className='mb-2'>
                                                    <Label>Phone</Label>
                                                    <input
                                                        className={`form-control ${classnames({ 'is-invalid': errors.phone })}`}
                                                        type="text"
                                                        id="phone"
                                                        {...register('phone', { required: true })}
                                                    />
                                                    {errors.phone && <small className="text-danger">Phone is required.</small>}
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className='mb-2'>
                                                    <Label>Gender</Label>
                                                    <select
                                                        className={`form-control ${classnames({ 'is-invalid': errors.gender })}`}
                                                        id="gender"
                                                        {...register('gender', { required: true })}
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    {errors.gender && <small className="text-danger">Gender is required.</small>}
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className='mb-2'>
                                                    <Label>Date of Birth</Label>
                                                    <input
                                                        className={`form-control ${classnames({ 'is-invalid': errors.dateOfBirth })}`}
                                                        type="date"
                                                        id="dateOfBirth"
                                                        {...register('dateOfBirth', { required: true })}
                                                    />
                                                    {errors.dateOfBirth && <small className="text-danger">Date of Birth is required.</small>}
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className='mb-2'>
                                                    <Label>Address</Label>
                                                    <input
                                                        className={`form-control ${classnames({ 'is-invalid': errors.address })}`}
                                                        id="address"
                                                        rows={3}
                                                        {...register('address', { required: true })}
                                                    />
                                                    {errors.address && <small className="text-danger">Address is required.</small>}
                                                </div>
                                            </Col>
                                        </Row>

                                        {/* Course selection for multiple courses */}
                                        <Row>
                                            <Col md="6">
                                                <div className='mb-2'>
                                                    <Label>Select Courses</Label>
                                                    <select
                                                        className={`form-control ${classnames({ 'is-invalid': errors.courseIds })}`}
                                                        id="courseIds"
                                                        multiple
                                                        {...register('courseIds', { required: true })}
                                                        value={watch('courseIds')}  // Use watch to bind value for controlled select
                                                    >
                                                        {courses && courses.map(course => (
                                                            <option key={course.id} value={course.id}>
                                                                {course.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.courseIds && <small className="text-danger">At least one course is required.</small>}
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="mt-4">
                                            <Button color="outline-primary" className="btn-block" type="submit">
                                                Submit
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    )
}

export default UpdateStudent;
