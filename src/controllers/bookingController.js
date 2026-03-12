import prisma from "../utils/prismaClient.js";

export const createBooking = async (req, res) => {
  try {
    const parentId = req.user.userId;
    const { studentId, lessonId } = req.body;

    if (!studentId || !lessonId) {
      return res.status(400).json({
        message: "studentId and lessonId are required"
      });
    }

    // Ensure student exists and belongs to this parent
    const student = await prisma.student.findUnique({
      where: { id: studentId }
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.parentId !== parentId) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Check if lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId }
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Prevent duplicate booking
    const existingBooking = await prisma.booking.findFirst({
      where: {
        studentId,
        lessonId
      }
    });


    if (existingBooking) {
      return res.status(400).json({
        message: "You already booked this lesson"
      });
    }

    const booking = await prisma.booking.create({
      data: {
        studentId,
        lessonId
      },
      include: {
        lesson: true,
        student: true
      }
    });

    

    res.status(201).json({
      message: "Lesson booked successfully",
      booking
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const parentId = req.user.userId;

    const bookings = await prisma.booking.findMany({
      where: {
        student: {
          parentId
        }
      },
      include: {
        lesson: true,
        student: true
      }
    });

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const parentId = req.user.userId;

    const booking = await prisma.booking.findFirst({
      where: {
        id,
        student: {
          parentId
        }
      }
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await prisma.booking.delete({ where: { id } });

    res.json({
      message: "Booking cancelled successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
