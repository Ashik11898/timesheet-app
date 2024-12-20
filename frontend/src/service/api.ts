
export const fetchData = async (url: string, config: RequestInit): Promise<Response | void> => {
  try {
    const response = await fetch(url, config);

    // if (response && response.statusText.toLowerCase() === 'unauthorized') {
    //   toastr.error('Session has expired, please login again');
    //   Authorization.logout();
    //   return;
    // }

    if (response.status === 417) {
      // Return the response for specific status code 417
      return response;
    }

    if (!response.ok) {
      //toastr.error(response.statusText || 'Something went wrong');
      return;
    }

    // Return the response if everything is fine
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Ensure the error is an instance of Error to access the message
      console.log('error', error.message);
    } else {
      console.log('Unknown error', error);
    }
  }
};
