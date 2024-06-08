import CONFIG from '../globals/config';

function addReview() {
  const createReview = async (id, name, body) => {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          name: name,
          body: body,
        }),
      });

      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { createReview: createReview };
}

export default addReview;
