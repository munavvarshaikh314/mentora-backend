import prisma from "../utils/prismaClient.js";

export const createLesson = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const mentorId = req.user.userId;

    if (!title || !description) {
      return res.status(400).json({
        message: "title and description are required"
      });
    }

    const lesson = await prisma.lesson.create({
      data: {
        title,
        description,
        price,
        // Force mentorId from the authenticated user
        mentorId
      }
    });

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLessons = async (req, res) => {
  try {
    const lessons = await prisma.lesson.findMany({
      include: {
        // Avoid returning mentor password hash
        mentor: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
          }
        }
      }
    });

    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        // Avoid returning mentor password hash
        mentor: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
          }
        }
      }
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
