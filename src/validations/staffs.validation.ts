import * as yup from 'yup';

const getAllSchema = yup
  .object({
    query: yup.object({
      page: yup.number().integer().positive().optional(),
      limit: yup.number().integer().positive().optional(),}),
      sort_by: yup.string().matches(/^(asc|desc)$/).optional(),
      sort_type: yup.string().matches(/^(createdAt|category_name)$/).optional(),
      keyword: yup.string().min(3).max(50).optional(), //search category_name
  })
  .required();
const createSchema = yup
  .object({
    body: yup.object({
      first_name: yup.string().min(3).max(50).required(),
      last_name: yup.string().min(3).max(50).required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).max(255).required(),
      active: yup.boolean().required(),
    }),
  })
  .required();

const getByIdSchema = yup
  .object({
    params: yup.object({
      id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID is non-Objectid'}).required(),
      
    }),
  })
  .required();

const updateByIdSchema = yup
  .object({
    params: yup.object({
      id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID is non-Objectid'}).required(),
      
    }),
    body: yup.object({
      first_name: yup.string().min(3).max(50).required(),
      last_name: yup.string().min(3).max(50).required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).max(255).required(),
      active: yup.boolean().required(),
    }),
  })
  .required();

const deleteByIdSchema = yup
  .object({
    params: yup.object({
      id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID is non-Objectid'}).required(),
      
    }),
  })
  .required();

export default {
  getAllSchema,
  createSchema,
  getByIdSchema,
  deleteByIdSchema,
  updateByIdSchema
};