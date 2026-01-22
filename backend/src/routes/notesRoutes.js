import express from 'express'
import { createNote, deletedNote, getAllNotes, getNoteById, updatedNote } from '../controllers/NotesController.js'



const router = express.Router()


router.get('/', getAllNotes)
router.get('/:id', getNoteById)
router.post('/', createNote)
router.put('/:id', updatedNote)
router.delete('/:id', deletedNote)


export default router