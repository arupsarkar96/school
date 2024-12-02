import { Router } from "express";
import v1Registration from "./routes/registration";
import v1LoginRouter from "./routes/login";
import v1Sessions from "./routes/sessions";
import v1Class from "./routes/class";
import v1Enrollment from "./routes/enrollment";
import v1Student from "./routes/student";
import v1Subject from "./routes/subject";
import v1Fee from "./routes/fee";
import v1Bill from "./routes/bill";
import v1Payment from "./routes/payment";
import v1Inventory from "./routes/inventory";
import v1Exam from "./routes/exam";
import v1School from "./routes/school";
import v1Dashboard from "./routes/dashboard";
import v1Service from "./routes/service";
import v1Staff from "./routes/staff";
import v1Result from "./routes/result";

const v1Router = Router();

v1Router.use('/dashboard', v1Dashboard)
v1Router.use('/registration', v1Registration)
v1Router.use('/login', v1LoginRouter)
v1Router.use('/session', v1Sessions)
v1Router.use('/class', v1Class)
v1Router.use('/enrollment', v1Enrollment)
v1Router.use('/student', v1Student)
v1Router.use('/subject', v1Subject)
v1Router.use('/fee', v1Fee)
v1Router.use('/bill', v1Bill)
v1Router.use('/payment', v1Payment)
v1Router.use('/inventory', v1Inventory)
v1Router.use('/exam', v1Exam)
v1Router.use('/result', v1Result)
v1Router.use('/school', v1School)
v1Router.use('/service', v1Service)
v1Router.use('/staff', v1Staff)

export default v1Router;