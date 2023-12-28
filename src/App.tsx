import './App.css';
import React, { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppWrapper, Footer, Main, StyledBox, StyledTitle, Container } from './styledcomponents/styled-components.ts';
import { SearchPage } from './components/search-page.tsx';
import { HeaderComponent } from './components/header.tsx';
import { MoviePage } from './components/movie-page.tsx';
import { AuthPage } from './components/auth-page.tsx';
import { RegPage } from './components/reg-page.tsx';
import { Collection } from './components/collection.tsx';
import { Preloader } from './components/preloader.tsx';
import { useAppDispatch } from './hooks/redux.ts';
import { authorize } from './store/reducers/ActionCreators.ts';

const Title = (props) => {
  return <StyledTitle {...props} >
  </StyledTitle>
}

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (localStorage.getItem('AUTH-TOKEN')) {
      dispatch(authorize({ key: localStorage.getItem('AUTH-TOKEN') as string }))
    }
  }, [])
  return (
    <AppWrapper className="App">
      <HeaderComponent />
      <Container>
        <Main wid='100%'>
          <StyledBox wid='100%' mar='0 5%'>
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route path='/' element={<Navigate to='/' />} />
                <Route path='/search' element={<SearchPage />} />
                <Route path='/moviepage/:id' element={<MoviePage />} />
                <Route path='/auth' element={<AuthPage />} />
                <Route path='/registration' element={<RegPage />} />
                <Route path='/collection' element={<Collection />} />
                {/* <Route path='*' element={<ErrorPage />} /> */}
              </Routes>
            </Suspense>
          </StyledBox>
        </Main>
      </Container>
      <Footer hig='10%' wid='100%'>

      </Footer>
    </AppWrapper>
  );
}
export default App;
