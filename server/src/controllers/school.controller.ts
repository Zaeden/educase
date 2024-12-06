import { Request, Response } from "express";
import { ZodError } from "zod";
import {
  coordinateSchema,
  schoolSchema,
} from "../validations/school.validation";
import prisma from "../db/db.config";
import * as geolib from "geolib";

class SchoolController {
  static async create(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body;
      const payload = schoolSchema.parse(body);

      const existingSchool = await prisma.school.findFirst({
        where: {
          name: payload.name,
          address: payload.address,
          latitude: payload.latitude,
          longitude: payload.longitude,
        },
      });

      if (existingSchool) {
        return res.status(409).json({ message: "School already exists" });
      }

      const school = await prisma.school.create({
        data: {
          ...payload,
        },
      });

      return res.status(201).json({ message: "School created successfully" });
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.reduce((acc, curr) => {
          const field = curr.path[0];
          if (!acc[field]) {
            acc[field] = [];
          }
          acc[field].push(curr.message);
          return acc;
        }, {} as Record<string, string[]>);
        return res.status(400).json(formattedErrors);
      } else {
        return res.status(500).json({ message: error });
      }
    }
  }

  static async show(req: Request, res: Response): Promise<any> {
    try {
      const { latitude, longitude } = coordinateSchema.parse(req.query);

      const schools = await prisma.school.findMany();
      console.log(schools);

      const sortedSchools = schools
        .map((school) => {
          const distance = geolib.getDistance(
            { latitude, longitude },
            { latitude: school.latitude, longitude: school.longitude }
          );

          return {
            ...school,
            distance: distance / 1000,
          };
        })
        .sort((a, b) => a.distance - b.distance);

      return res.status(200).json({
        message: "Schools fetched successfully",
        schools: sortedSchools,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.reduce((acc, curr) => {
          const field = curr.path[0];
          if (!acc[field]) {
            acc[field] = [];
          }
          acc[field].push(curr.message);
          return acc;
        }, {} as Record<string, string[]>);
        return res.status(400).json(formattedErrors);
      } else {
        return res.status(500).json({ message: error });
      }
    }
  }
}

export default SchoolController;
