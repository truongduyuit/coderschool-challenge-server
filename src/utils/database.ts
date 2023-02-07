import { PipelineStage } from "mongoose";
import { Document, Model, SaveOptions, ModifyResult, HydratedDocument, PopulateOptions } from "mongoose";
import { Injectable } from "./decorator";

interface IQuery {
  query?: any;
  page: number;
  limit: number;
  sort?: any;
  select?: string;
  options?: any;
}

interface IPopulate {
  query?: any;
  populate: PopulateOptions | (string | PopulateOptions)[];
  sort?: any;
  select?: string;
  page: number;
  limit: number;
}

interface IUpdateAndPopulate {
  query?: any;
  populate: PopulateOptions | (string | PopulateOptions)[];
  select?: string;
  data: any;
  options?: any;
}

export interface DatabaseService {
  getAll: () => Promise<any[]>;

  getById: (id: any) => Promise<any>;

  getOne: (query: any) => Promise<any>;

  getByQuery: ({ page, limit, select, sort, query }: IQuery) => Promise<{
    records: any[];
    metadata: {
      totalPage: number;
      totalRecord: number;
      currentPage: number;
      limit: number;
    };
  }>;

  getDistinct: ({ distinct, query }: { distinct: string; query: IQuery }) => Promise<any[]>;

  create: (data: any, options?: SaveOptions) => Promise<any>;

  createOrUpdate: (query: IQuery, data: any, options?: any) => void;

  countByQuery: (query: IQuery) => void;

  updateOne: (query: IQuery, data: any, options?: any) => Promise<ModifyResult<HydratedDocument<any, {}, {}>>>;

  updateMany: (query: any, data: any, options?: any) => Promise<any>;
}
