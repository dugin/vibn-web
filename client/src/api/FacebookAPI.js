import graph from 'fb-react-sdk';


export const setAcessToken = (accessToken) => {
    graph.setAccessToken(accessToken);
};

export const getAcessToken = () => {
    return graph.getAccessToken();
};

export const getEvent = (id) => {
    return new Promise((resolve, reject) => {
        graph.get(`/${id}?fields=id,name,attending_count,cover,description,is_canceled,owner,start_time,end_time,place`,
            (err, res) => {
                err ? reject(err) : resolve(res);
            })
    })

};
