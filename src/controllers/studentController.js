import prisma from "../utils/prismaClient.js";
import { studentSchema } from "../validators/studentValidator.js";

export const createStudent = async (req, res) => {
  try {

    // Validate request body
    const parsed = studentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.issues
      });
    }

    // Parent is the authenticated user
    const parentId = req.user.userId;

    const student = await prisma.student.create({
      data: {
        name: parsed.data.name,
        parentId
      }
    });

    res.status(201).json(student);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

export const getStudents = async (req, res) => {
  try {

    const parentId = req.user.userId;

    const students = await prisma.student.findMany({
      where: { parentId }
    });

    res.json(students);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};