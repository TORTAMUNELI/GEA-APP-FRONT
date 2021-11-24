export const getGifs = async (category) => {

    const url = `https://api.giphy.com/v1/gifs/random?api_key=56EdCEwnWBUblemnPPTKrzGFFS7q5SFL`;
    const resp = await fetch(url);
    const { data } = await resp.json();

    return {
        url: data.url,
        title: data.title
    }
}