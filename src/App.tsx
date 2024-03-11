import './App.css';
import React, { Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppWrapper, Footer, Main, StyledBox, StyledTitle, Container, Flex } from './styledcomponents/styled-components.ts';
import { SearchPage } from './components/search-page.tsx';
import { HeaderComponent } from './components/header.tsx';
import { MoviePage } from './components/movie-page.tsx';
import { AuthPage } from './components/auth-page.tsx';
import { RegPage } from './components/reg-page.tsx';
import { Collection } from './components/collection.tsx';
import { Preloader } from './components/preloader.tsx';
import { useAppDispatch } from './hooks/redux.ts';
import { authorize } from './store/reducers/ActionCreators.ts';
import { MoviesPage } from './components/movies-page.tsx';
import { Theme } from './index.js';
import { Error } from './components/error.tsx';

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
  const [theme, setTheme] = useState(['black', 'white'])
  return (
    <Theme>
      <AppWrapper className="App" bgc={theme[0]} color={theme[1]} >
        <HeaderComponent theme={theme} setTheme={setTheme} />
        <Container>
          <Main wid='100%'>
            <StyledBox wid='100%' mar='0 5%'>
              <Suspense fallback={<Preloader />}>
                <Routes>
                  <Route path='/' element={<Navigate to='/main' />} />
                  <Route path='/search' element={<SearchPage theme={theme} />} />
                  <Route path='/moviepage/:id' element={<MoviePage />} />
                  <Route path='/auth' element={<AuthPage theme={theme} />} />
                  <Route path='/registration' element={<RegPage theme={theme} />} />
                  <Route path='/collection' element={<Collection />} />
                  <Route path='/main' element={<MoviesPage theme={theme} />} />
                  <Route path='*' element={<Error />} />
                </Routes>
              </Suspense>
            </StyledBox>
          </Main>
        </Container>
        <Footer hig='10%' wid='100%'>
          <Flex mt='30px' ml='10%'>
          </Flex>
        </Footer>
      </AppWrapper>
    </Theme >
  );
}
export default App;
