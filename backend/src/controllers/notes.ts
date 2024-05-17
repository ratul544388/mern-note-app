import { RequestHandler } from "express";
import noteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { NoteSchema } from "../validations";
import * as z from "zod";

export const getNotes: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;
  try {
    const notes = await noteModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(404, "Invalid note ID");
    }

    const note = await noteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "No note found!");
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote: RequestHandler<
  { userId: string },
  unknown,
  z.infer<typeof NoteSchema>,
  unknown
> = async (req, res, next) => {
  const values = req.body;
  const userId = req.session.userId;

  const validatedFields = NoteSchema.safeParse(values);

  if (!validatedFields.success) {
    throw createHttpError(400, "Invalid fields");
  }

  try {
    const newNote = await noteModel.create({
      ...values,
      userId,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote: RequestHandler<
  { noteId: string },
  unknown,
  z.infer<typeof NoteSchema>,
  unknown
> = async (req, res, next) => {
  const { noteId } = req.params;
  const values = req.body;

  const validatedFields = NoteSchema.safeParse(values);

  if (!validatedFields.success) {
    throw createHttpError(400, "Invalid fields");
  }

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note ID");
    }

    const updatedNote = await noteModel.findByIdAndUpdate(noteId, {
      ...values,
    });

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note ID");
    }

    await noteModel.findByIdAndDelete(noteId);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
