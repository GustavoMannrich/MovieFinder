import '../style/content.css';
import Filter from './filter';
import MovieGrid from './movie-grid';

const Content = () => {
    return (
        <div className="content-main">
            <div className="content">
                <Filter></Filter>
                <MovieGrid></MovieGrid>
            </div>
        </div>
    );
};

export default Content;
