import prisma from "../utils/prismaClient.js";

export const createSession = async (req, res) => {

  try {

    const { lessonId, date, topic, summary } = req.body;
    const mentorId = req.user.userId;

    if (!lessonId || !date || !topic || !summary) {
      return res.status(400).json({
        error: "lessonId, date, topic, and summary are required"
      });
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId }
    });

    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    if (lesson.mentorId !== mentorId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const sessionDate = new Date(date);
    if (Number.isNaN(sessionDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const session = await prisma.session.create({

      data: {
        lessonId,
        date: sessionDate,
        topic,
        summary
      }

    });

    res.status(201).json(session);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

export const getLessonSessions = async (req, res) => {

  try {

    const { id } = req.params;

    const sessions = await prisma.session.findMany({
      where: { lessonId: id }
    });

    res.json(sessions);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};
