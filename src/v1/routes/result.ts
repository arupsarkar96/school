

import { Router } from "express";
import { getResultsService } from "../service/result";
import { adminAuthorize } from "../middleware/auth";


const v1Result = Router()



v1Result.get('/:session/:classId/:exam', adminAuthorize, async (req, res) => {
    const { session, classId, exam } = req.params
    const results = await getResultsService(session, classId, exam)
    res.json(results)
})



export default v1Result