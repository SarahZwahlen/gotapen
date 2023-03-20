// Tester si le user fait partie de la company

import {
    buildCompany,
    buildSupply,
    buildUser
} from '../../infrasturcture/builders/builders.test.utils';
import { SupplyType } from '../../infrasturcture/models/supply';
import { getAllCompanySupplies } from './showCompanySupplies.usecase';

describe('Get all company supplies', () => {
    test('Happy path', async () => {
        const firstCompany = await buildCompany({ name: 'Super company' });
        const user = await buildUser({
            firstname: 'Jean-Michel',
            surname: 'Apeuprès',
            company: firstCompany
        });

        firstCompany.employees = [user];

        const secondCompany = await buildCompany({ name: 'Franche-comté' });

        const supplyRed = await buildSupply({ company: firstCompany });
        const supplyBlue = await buildSupply({ company: firstCompany });
        const supplyGreen = await buildSupply({ company: secondCompany });

        const supplyDB: SupplyType[] = [supplyRed, supplyBlue, supplyGreen];

        const getCompany = async (firstCompanyId: string) => {
            return firstCompany;
        };

        const getUserCompany = async (
            firstCompanyId: string,
            UserId: string
        ) => {
            return firstCompany;
        };

        const getSupplies = async (firstCompanyId: string) => {
            const result = supplyDB.filter(
                (supply) => (supply.company.id = firstCompany.id)
            );
            return [];
        };

        const result = getAllCompanySupplies(
            firstCompany.id,
            user.id,
            getCompany,
            getUserCompany,
            getSupplies
        );
        expect(result).not.toContain(supplyGreen);
    });

    test("Company doesn't exists", async () => {
        const firstCompany = await buildCompany({
            name: 'Super company'
        });
        const user = await buildUser({
            firstname: 'Jean-Michel',
            surname: 'Apeuprès',
            company: firstCompany
        });

        firstCompany.employees = [user];

        const secondCompany = await buildCompany({
            name: 'Franche-comté'
        });

        const supplyRed = await buildSupply({ company: firstCompany });
        const supplyBlue = await buildSupply({ company: firstCompany });
        const supplyGreen = await buildSupply({
            company: secondCompany
        });

        const randomID = '123456';
        const supplyDB: SupplyType[] = [supplyRed, supplyBlue, supplyGreen];

        const getCompany = async (firstCompanyId: string) => {
            return null;
        };

        const getUserCompany = async (
            firstCompanyId: string,
            UserId: string
        ) => {
            return null;
        };

        const getSupplies = async (firstCompanyId: string) => {
            const result = supplyDB.filter(
                (supply) => (supply.company.id = firstCompany.id)
            );
            return [];
        };

        await expect(
            async () =>
                await getAllCompanySupplies(
                    randomID,
                    user.id,
                    getCompany,
                    getUserCompany,
                    getSupplies
                )
        ).rejects.toThrow("This company doesn't exists");
    });

    test('User is not part of the company', async () => {
        const firstCompany = await buildCompany({
            name: 'Super company'
        });
        const user = await buildUser({
            firstname: 'Jean-Michel',
            surname: 'Apeuprès',
            company: firstCompany
        });

        firstCompany.employees = [user];

        const secondCompany = await buildCompany({
            name: 'Franche-comté'
        });

        const supplyRed = await buildSupply({ company: firstCompany });
        const supplyBlue = await buildSupply({ company: firstCompany });
        const supplyGreen = await buildSupply({
            company: secondCompany
        });

        const randomID = '123456';
        const supplyDB: SupplyType[] = [supplyRed, supplyBlue, supplyGreen];

        const getCompany = async (firstCompanyId: string) => {
            return firstCompany;
        };

        const getUserCompany = async (
            firstCompanyId: string,
            UserId: string
        ) => {
            return secondCompany;
        };

        const getSupplies = async (firstCompanyId: string) => {
            const result = supplyDB.filter(
                (supply) => (supply.company.id = firstCompany.id)
            );
            return [];
        };

        await expect(
            async () =>
                await getAllCompanySupplies(
                    randomID,
                    user.id,
                    getCompany,
                    getUserCompany,
                    getSupplies
                )
        ).rejects.toThrow('This user is not part of the company');
    });
});
