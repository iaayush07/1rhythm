/**
 * @author Jinal Tandel
 * @description "Status code of the API"
 */
export enum Messages{
    /** For unauthorized error message */
    MessageForUnauthorizedUser = "You don't have permission to access the data for this page.",
    /** For internal server error message */
    MessageForInternalServerError = "Internal Server Error",
    /** message for token expired */
    MessageForUnauthorizedToken = 'Session Expired. Please login again.',
    /** For invalid input error message*/
    MessageForInvalidInput = 'Invalid Input'
}