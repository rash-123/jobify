import "express-async-errors";

import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";

// import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

// import { nanoid } from "nanoid";

// let jobs = [
//     { id: nanoid(), company: "apple", position: "front-end" },
//     { id: nanoid(), company: "google", position: "back-end" },
// ];

export const getAllJobs = async (req, res) => {
    console.log(req.user);
    const jobs = await Job.find({createdBy: req.user.userId});
    res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
    // const { id } = req.params;

    const job = await Job.findById(req.params.id);
    res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
    // const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(StatusCodes.OK).json({ msg: "job modified", job: updatedJob });
};

export const deleteJob = async (req, res) => {
    // const { id } = req.params;
    const removedJob = await Job.findByIdAndDelete(req.params.id);

    res.status(StatusCodes.OK).json({ msg: "job deleted", job: removedJob });
};
