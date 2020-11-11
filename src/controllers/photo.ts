import { Request, Response } from "express";
import path from 'path';
import fs from 'fs-extra';
import Photo from '../models/photo';

export async function getPhotos(req: Request, res: Response): Promise<Response> {
  try {
    const photos = await Photo.find()
    return res.status(200).json(photos)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}
export async function getPhoto(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const photo = await Photo.findById(id)
    if(!photo) return res.status(404).json({ msg: 'photo not found..!'})
    return res.status(200).json(photo)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

export async function creaePhoto(req: Request, res: Response): Promise<Response> {
  try {
    const { title, description } = req.body;
    const newPhoto = new Photo({
      title,
      description,
      imagePath: req.file.path
    })
    await newPhoto.save()

    return res.status(201).json({ msg: 'image created successfully', newPhoto })
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

export async function deletePhoto(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const photo = await Photo.findByIdAndDelete(id)
    if(!photo) return res.status(404).json({ msg: 'photo not found..!'})
    await fs.unlink(path.resolve(photo.imagePath))
    return res.status(200).json({ msg: 'photo was deleted...!'})
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

export async function editPhoto(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { title, description } = req.body
    const photo = await Photo.findByIdAndUpdate(id, {title, description}, {new: true})
    if(!photo) return res.status(404).json({ msg: 'photo not found..!'})
    return res.status(200).json({ msg: 'photo was updated...!', photo})
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}