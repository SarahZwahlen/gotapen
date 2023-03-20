import { RequestHandler, Request, Response } from 'express';
import { RequestOptions, createRequest, createResponse } from 'node-mocks-http';

type TestRequest = Request & ReturnType<typeof createRequest>;
type TestResponse = Response & ReturnType<typeof createResponse>;

const testController = async (
    controller: RequestHandler,
    options: RequestOptions
) => {
    const req = createRequest<TestRequest>(options);
    const res = createResponse<TestResponse>();

    await controller(req, res, jest.fn());

    return res;
};

export { testController };
