import Express from 'express';
import getEmployeesList from '../../usecases/company/getEymployeesList.usecase';
import { companyRepositoryMongo } from '../../infrasturcture/repositories/repositoryMongo/companyRepository.Mongo';

const getEmployees = async (req: Express.Request, res: Express.Response) => {
    try {
        if (req.session.user) {
            if (req.session.user.roles.includes('admin')) {
                const employeesList = await getEmployeesList(
                    companyRepositoryMongo,
                    req.session.user.company.toString()
                );
                if (employeesList) {
                    res.status(200).json({
                        message: "Here are the employees's list",
                        employeesList
                    });
                } else {
                    res.status(200).json({
                        message:
                            'There are currently no employees registered in this company'
                    });
                }
            } else {
                res.status(403).json({
                    message: 'You must be admin'
                });
            }
        } else {
            res.status(403).json({
                message: 'You must be logged'
            });
        }
    } catch (error) {
        res.status(400).json({
            error,
            message: 'An error occured'
        });
    }
};

export default getEmployees;
