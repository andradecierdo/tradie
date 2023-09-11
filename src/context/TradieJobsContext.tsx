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
  setNotes: (notes: INote[]) => void
  getNotesByJob: (jobId: string) => INote[]
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
  const [tradies, setTradies] = useState<ITradie[]>(tradieDataService.initialize(tradiesJsonData))
  const [notes, setNotes] = useState<INote[]>(noteDataService.initialize(notesJsonData))
  const [jobs, setJobs] = useState<IJob[]>(jobDataService.initialize(jobsJsonData))

  const getJob = (jobId: string): IJob | null => {
    return jobs.find(job => job.id === jobId) || null
  }

  const addNote = (noteInput: INoteInput): void => {
    const id = notes.length.toString()
    const newNote = noteDataService.createModel(id, noteInput)
    const newNotes = [...notes, newNote]
    setNotes(newNotes)
    noteDataService.saveData(newNotes)
  }

  const getNotesByJob = (jobId: string): INote[] => {
    return notes.filter(note => note.jobId === jobId)
  }

  const updateJobStatus = (jobId: string, status: JobStatus): void => {
    const newJobs = jobs.map(job => job.id === jobId ? { ...job, status: status } : job)
    setJobs(newJobs)
    jobDataService.saveData(newJobs)
  }

  const value: TradieJobsContext = {
    tradie,
    tradies,
    setTradie,
    getJob,
    getNotesByJob,
    jobs,
    addNote,
    notes,
    setNotes,
    updateJobStatus,
  }

  return (
    <TradieJobsContext.Provider value={value}>
      {children}
    </TradieJobsContext.Provider>
  )
}
