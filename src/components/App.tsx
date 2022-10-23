import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '@src/components/layouts/Footer';
import Header from '@src/components/layouts/Header';
import Top from '@src/components/Top';
import { ColorThemeContext } from '@src/context/ColorThemeContext';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

type ColorTheme = 'light' | 'dark';

function App() {
  const [mode, setMode] = useState<ColorTheme>('light');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  );
  const colorMode = React.useMemo(
    () => ({
      toggleColorTheme: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  return (
    <React.Fragment>
      {/* CSSリセット */}
      <CssBaseline />
      {/* カラーテーマの変更に必要なロジックをグローバル化させる */}
      <ColorThemeContext.Provider value={colorMode}>
        {/* カラーテーマ */}
        <ThemeProvider theme={theme}>
          {/* SPA用Router親 */}
          <BrowserRouter>
            {/* レイアウト */}
            <Header />
            <Routes>
              {/* Appコンテンツ */}
              <Route path="/" element={<Top />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ThemeProvider>
      </ColorThemeContext.Provider>
    </React.Fragment>
  );
}

export default App;
