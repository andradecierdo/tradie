import React, { createContext, ReactNode, useContext, useState } from 'react'
import { IJob, INote, INoteInput, ITradie, JobStatus } from '../models'
import { TradieDataService } from '../storage/TradieDataService'
import { JobDataService } from '../storage/JobDataService'
import { NoteDataService } from '../storage/NoteDataService'
import { LocaleStorageService } from '../services/LocaleStorageService'
import tradiesJsonData from '../data/tradies.json'
import jobsJsonData from '../data/jobs.json'
import notesJsonData from '../data/notes.json'

type TradieJobsProviderProps = {
  children: ReactNode
}

type TradieJobsContext = {
  tradie: ITradie
  tradies: ITradie[]
  setTradie: (tradie: ITradie) => void
  notes: INote[]
  addNote: (noteInput: INoteInput) => void
  updateNote: (id: string, content: string) => void
  getJobNotes: (jobId: string) => INote[]
  getJob: (jobId: string) => IJob | null
  updateJobStatus: (jobId: string, status: JobStatus) => void
  jobs: IJob[]
}

const TradieJobsContext = createContext({} as TradieJobsContext)

export function useTradieJobs() {
  return useContext(TradieJobsContext)
}

export function TradieJobsProvider({ children }: TradieJobsProviderProps) {
  const tradieDataService = new TradieDataService(new LocaleStorageService<ITradie>())
  const jobDataService = new JobDataService(new LocaleStorageService<IJob>())
  const noteDataService = new NoteDataService(new LocaleStorageService<INote>())

  const [tradie, setTradie] = useState({} as ITradie)
  // Initializes data from the local storage if exist, otherwise use the given json data
  const [tradies] = useState<ITradie[]>(tradieDataService.initialize(tradiesJsonData))
  const [notes, setNotes] = useState<INote[]>(noteDataService.initialize(notesJsonData))
  const [jobs, setJobs] = useState<IJob[]>(jobDataService.initialize(jobsJsonData))

  const getJob = (jobId: string): IJob | null => {
    return jobs.find(job => job.id === jobId) || null
  }

  const addNote = (noteInput: INoteInput): void => {
    // It is safe to use the notes length as the ID since we do not delete a note.
    const id = (notes.length + 1).toString()
    const newNote = noteDataService.createModel(id, noteInput)
    const newNotes = [...notes, newNote]
    setNotes(newNotes)
    // After adding a note, save the updated list of notes to the storage
    noteDataService.saveData(newNotes)
  }

  const updateNote = (noteId: string, content: string): void => {
    const updatedNotes = notes.map(note => note.id === noteId ? { ...note, content } : note)
    setNotes(updatedNotes)
    // After adding a note, save the updated list of notes to the storage
    noteDataService.saveData(updatedNotes)
  }

  const getJobNotes = (jobId: string): INote[] => {
    return notes.filter(note => note.jobId === jobId)
  }

  const updateJobStatus = (jobId: string, status: JobStatus): void => {
    const newJobs = jobs.map(job => job.id === jobId ? { ...job, status: status } : job)
    setJobs(newJobs)
    // After updating a job, save the updated list of jobs to the storage
    jobDataService.saveData(newJobs)
  }

  const value: TradieJobsContext = {
    tradie,
    tradies,
    setTradie,
    getJob,
    getJobNotes,
    jobs,
    addNote,
    updateNote,
    notes,
    updateJobStatus,
  }

  return (
    <TradieJobsContext.Provider value={value}>
      {children}
    </TradieJobsContext.Provider>
  )
}
