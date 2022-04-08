import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Photos from "../Photos";

const albumId = {
    params: {
        id : 1
    }
}


const PhotosPage = () => {
    return (
        <BrowserRouter>
            <Photos match = {albumId}/>
        </BrowserRouter>
    )
}

describe("PhotosPage", () => {
    beforeEach(() => {
        jest.mock("../../../__mocks__/getAllPhotosByAlbumId")
    })

    it('should fetch and render a photo element', async () => {
        render(
            <PhotosPage />
        );
        const photoDivElement = await screen.findByTestId(`photo-item-1`)
        expect(photoDivElement).toBeInTheDocument();
    });
    
    it('should fetch all photos', async () => {
        render(
            <PhotosPage />
        );
    
        const all = await screen.findAllByTestId(/photo-item/i)
        expect(all.length).toBe(50);
    });

})