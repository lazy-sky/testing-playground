import "@testing-library/jest-dom";
import * as nock from "nock";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const queryClient = new QueryClient({
  defaultOptions: {}
});


describe('로그인 테스트', () => {
  // 테스트하는 동안 에러 로그가 찍히지 않도록 처리
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  })

  afterAll(() => {
    jest.restoreAllMocks();
  })

  test('로그인에 실패하면 에러메세지가 나타난다', async () => {
    // given - 로그인 페이지가 그려진다
    const routes = [
      {
        path: "/login",
        element: <LoginPage />,
      }
    ]

    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
      initialIndex: 0
    })

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    // when - 사용자가 로그인에 실패한다
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const WRONG_EMAIL = 'wrong@emial.com'
    const WRONG_PASSWORD = 'wrongPassword'

    nock("https://inflearn.byeongjinkang.com")
      .post('/users/login', {
        email: WRONG_EMAIL,
        password: WRONG_PASSWORD
      })
      .reply(400);

    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    fireEvent.change(emailInput, { target: { value: WRONG_EMAIL } });
    fireEvent.change(passwordInput, { target: { value: WRONG_PASSWORD} });
    fireEvent.click(loginButton);

    const { result } = renderHook(() => useLogin(), { wrapper });

    // then - 로그인 에러 메세지가 화면에 나타난다
    await waitFor(() => result.current.isError)
    const errorMessage = await screen.findByTestId('error-message')
    expect(errorMessage).toBeInTheDocument()
  })
})