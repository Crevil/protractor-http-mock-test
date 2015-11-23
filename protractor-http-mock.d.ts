// Type definitions for protractor-http-mock
// Project: https://github.com/atecarlos/protractor-http-mock
// Definitions by: Bjørn Sørensen <https://github.com/Crevil>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/**
 * Object describing the request to mock.
 */

/**
 * Base mock response.
 */
interface MockResponse<T> {
    data: T;
    status?: number;
}

/**
 * Base mock request.
 */
interface MockRequest {
    path: string|(() => string);
    method?: string|(() => string);
}

/**
 * Base mock.
 */
interface Mock<ResponseData> {
    request: MockRequest;
    response: MockResponse<ResponseData>;
}

/**
 * Get mock request.
 */
interface GetMockRequest extends MockRequest {
    params?: any;
    queryString?: {[queryString: string]: string|(() => string)};
    headers?: ng.IHttpRequestConfigHeaders;
}

/**
 * Post mock request.
 */
interface PostMockRequest<T> extends MockRequest {
    data?: T;
}


/**
 * Mock for GET requests.
 */
interface GetMock<ResponseData> extends Mock<ResponseData> {
    request: GetMockRequest;
}

/**
 * Mock for POST requests.
 */
interface PostMock<RequestData, ResponseData> {
    request: PostMockRequest<RequestData>;
    response: {
        data: ResponseData;
        status?: number;
    }
}

interface ProtractorHttpMockStatic {
    /**
     * Creates a new mock context from array of mocks.
     * @param mocks Array of mock objects.
     * @param skipDefaults Set true to skip loading of default mocks.
     */
    <RequestData, ResponseData>(mocks?: Array<GetMock<RequestData>|PostMock<RequestData, ResponseData>>, skipDefaults?: boolean): ProtractorHttpMockStatic;
    
    /**
     * Creates a new mock context from mock identifiers.
     * @param mocks Paths to mock files relative to mocks.dir in mock.config.
     */
    (mocks?: Array<string>): ProtractorHttpMockStatic;
    
    /**
     * Clean up mocks.
     */
    teardown(): void;
    
    /**
     * Get list of matched requests. 
     */
    requestsMade();
    
    /**
     * Clear list of matched requests.
     */
    clearRequests(): void;
    
    /**
     * Module configurtaion.
     */
    config: {
        /**
         * Root directory for module.
         */
        rootDirectory?: string;
        
        /**
         * Path to protractor configuration.
         */
        protractorConfig?: string;
    };
}

declare var mock: ProtractorHttpMockStatic;

declare module 'protractor-http-mock' {
    export = mock;
}
