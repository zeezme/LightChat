import { Router } from 'express'

import AccountController from '../Controller/AccountController.js'

const router = Router()

router.get('/', AccountController.index)

router.get('/:id', AccountController.show)

router.post('/', AccountController.store)

router.put('/:id', AccountController.update)

router.delete('/:id', AccountController.delete)

export default router
