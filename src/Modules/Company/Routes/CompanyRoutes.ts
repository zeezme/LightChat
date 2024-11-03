import { Router } from 'express'

import CompanyController from '../Controller/CompanyController.js'

const router = Router()

router.get('/', CompanyController.index)

router.get('/:id', CompanyController.show)

router.post('/', CompanyController.store)

router.put('/:id', CompanyController.update)

router.delete('/:id', CompanyController.delete)

export default router
