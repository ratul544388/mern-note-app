import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import * as z from "zod";
import userModel from "../models/user";
import { LoginSchema, SignupSchema } from "../validations";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await userModel
      .findById(req.session.userId)
      .select("+email")
      .exec();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser: RequestHandler<
  unknown,
  unknown,
  z.infer<typeof SignupSchema>,
  unknown
> = async (req, res, next) => {
  const values = req.body;
  console.log(values);
  const validatedFields = SignupSchema.safeParse(values);

  try {
    if (!validatedFields.success) {
      throw next(createHttpError(400, "Invalid fields"));
    }

    const { email, password, name } = values;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingEmail = await userModel.findOne({ email }).exec();

    if (existingEmail) {
      throw next(createHttpError(409, "Email already exist"));
    }

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    req.session.userId = user._id;

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler<
  unknown,
  unknown,
  z.infer<typeof LoginSchema>,
  unknown
> = async (req, res, next) => {
  const values = req.body;
  const validatedFields = LoginSchema.safeParse(values);

  try {
    if (!validatedFields.success) {
      throw next(createHttpError(400, "Invalid fields"));
    }

    const { email, password } = values;

    const user = await userModel
      .findOne({ email })
      .select("+password +email")
      .exec();

    if (!user || !user.password) {
      throw createHttpError(401, "Email does not exist");
    }

    console.log(user.password);

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      throw createHttpError(401, "Incorrect password");
    }

    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
