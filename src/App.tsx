import {useGetGlassesQuery} from "./feature/glasses/api/glassesApi.ts";


export function App() {
    const {data, error, isLoading} = useGetGlassesQuery({id: '1', params: {}});
    if (data?.data[3]?.attributes.img.data.attributes.url) {
        console.log(data.data[3].attributes.img.data.attributes.url)
    }
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    const imageUrl = data.data[3].attributes.img.data.attributes.url;
    return <div>
        {imageUrl && (
            <img src={`http://localhost:1337${imageUrl}`} alt="Glasses"/>
        )}
        {/*{data && data.map(item => (*/}
        {/*    <div key={item.id}>*/}
        {/*        <h2>{item.attributes.name}</h2>*/}
        {/*        {item.attributes.img.data && (*/}
        {/*            <img*/}
        {/*                src={`http://localhost:1337${item.attributes.img.data.attributes.formats.medium.url}`}*/}
        {/*                alt={item.attributes.name}*/}
        {/*            />*/}
        {/*        )}*/}
        {/*    </div>*/}
        {/*))}*/}
    </div>
}