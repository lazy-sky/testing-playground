# testing-playground

# 1. 테스트코드란?

## 1.1 테스트 코드 작성의 목적과 장점

### 1.1.1 테스트코다 작성의 목적

- **정확성 및 신뢰성 확보**:
  - 테스팅의 주요 목적은 코드의 **올바른 작동** 확인
  - 다양한 조건 및 입력에서 컴포넌트와 코드가 **예상대로 작동하는지** 확인
- 수월한 **리팩토링**:
  - 프로젝트가 성장하면 리팩토링이 필요
    - 코드 품질, 성능 개선 또는 새로운 패턴 적용 등
  - 리팩토링 전 테스트코드를 작성하면 **최소한의 기준**이 만들어짐
  - 변경사항 또는 최적화가 **예상치 못한 버그를 초래하지 않도록**
  - 리팩토링 전에 테스트코드 작성하는 것도 좋음
    - 프로젝트 초반부터 테스트코드를 작성하면서 진행하면 좋지만 일반적으로 시간이 부족함
    - 추후 개선할 때 테스트코드 작성으로 안전망을 둘러두고, 리팩토링 진행하면 적당한 트레이드오프

### 1.1.2 테스트코드 작성의 장점

- **문서화 및 이해**:
  - 명확하게 작성된 테스트는 문서의 형태
    - 내가 작성한 코드가 기획의도를 확실히 반영하는지
    - 기획 내용을 꼼꼼하게 반영했는지
    - **기획자와의 소통의 도구**
        
      ```jsx
      describe("회원가입 페이지", () => {
        /*
        각 항목을 jira ticket으로 생각하고 작업할 수 있음
        브랜치 별로 테스트코드 작업 가능
        */
        test("인풋이 활성화되면 underline의 컬러가 바뀐다", async () => {  });
        test("아이디가 중복이면 에러메시지가 나타난다", async () => {  });
        test("비밀번호가 일치하지 않으면 에러메시지가 나타난다", async () => {  });
        test("회원가입에 실패하면 에러메세지가 나타난다", async () => {  });
      });
      ```
  - 다른 개발자들은 테스트를 보고 컴포넌트나 함수의 예상되는 동작을 이해할 수 있음
    - 새로운 개발자가 조인했을 때 온보딩이 수월해짐
    - 코드 파악이 용이함

## 1.2 무엇을 테스트 할 것인가?

- 테스트의 목적에 대해
  - 코드가 올바르게 동작하는지 확인하는 것
  - 브라우저에서 내가 작성한 코드가 잘 동작하는지 확인
- 테스트 해야할 항목들
  - 코드가 올바르게 동작한다는 것은?
    - 사용자가 서비스를 사용하는데 문제가 없다는 것
  - 비지니스 로직 테스트 필요
    - 코드가 잘 “동작” 하는지를 확인하기 위한 테스트
    - 버튼을 클릭했을 때 내가 의도한대로 잘 동작하는지?
      - 로그인 성공 시 내가 원하는 화면으로 잘 redirect 되는지
      - 로그인 실패 시 내가 원하는 에러메시지가 잘 나오는지
- 테스트 하지 않아도 되는 것들
  - UI 테스트
    - 로그인을 테스트 할 때, 인풋과 버튼의 존재를 확인하긴 해야함
    - 하지만 아이디, 비밀번호 인풋간의 마진이나 버튼의 패딩 등은 테스트 하지 않아도 됨
      - 어차피 우리는 반응형을 고려해야 함

## 1.3 다양한 유형의 테스트

- 유닛테스트
  - 가장 작은 단위의 테스트
  - 로그인을 예로 들면
    - 위에서 언급한 인풋이나 버튼들이 잘 렌더링 되는지
    - 이메일 인풋의 값이 잘 변경되는지
    - 버튼을 클릭하면 로그인이 잘 되는지
  - 회원가입을 한다면 비밀번호가 설정한 규칙에 잘 맞는지?
- 통합테스트
  - 다양한 컴포넌트 / 모듈 / 함수들이 잘 연결되는지 확인함
  - e.g., 로그인
    - 로그인 버튼을 클릭하고, 로그인 성공 시 원하는 화면으로 잘 redirect되는지
    - 로그인 실패하면 별도로 선언한 Modal이 잘 보여지는지
- E2E테스트
  - 실제 사용자인것처럼 테스트
  - 유닛테스트 + 통합테스트
  - 개발 비용이 가장 비싸다고 보면될듯
- 프론트엔드는 이 경계가 모호
  - 일반적인 통념은
    - 유닛테스트, 통합테스트는 `jest`를 활용하고
    - e2e 테스트는 `cypress`를 활용
  - 그런데, `cypress`로 유닛테스트나 통합테스트도 충분히 가능
    - 굳이 '유닛테스트만 한다, e2e테스트까지 한다' 보다는 `우리는 테스트코드를 작성한다` 가 더 좋은 개념이지 않을까

# 2. jest를 활용한 테스트코드 작성

## 2.1 JavaScript 테스트코드 문법 소개

### 2.1.1 it (또는 test)

- 실제 테스트 코드를 작성하는 함수
- 하나의 테스트 케이스를 작성하는 곳
- 테스트 코드가 어떤 역할을 하는지 작성하는 곳
- 테스트 명을 문장으로 작성해서 하나의 문장이 되는 형식

  ```jsx
  it('should render username and password input fields', () => {
      const { getByPlaceholderText } = render(<Login />);
      
      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');

      expect(usernameInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

  test('계정 정보를 입력할 수 있는 input들이 화면에 나타난다', () => {
      const { getByPlaceholderText } = render(<Login />);
      
      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');

      expect(usernameInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });
  ```
​
### 2.1.2 describe

- it이나 test들의 묶음
- 관련있는 테스트들을 하나로 묶는 것 - 응집도를 높일 수 있음
- `LoginComponent`와 관련된 테스트 들을 설명(describe)하는 것

  ```jsx
  describe('Login Component', () => {
    it('should render username and password input fields', () => {
      const { getByPlaceholderText } = render(<Login />);
      
      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');

      expect(usernameInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    it('should call authenticateUser service with entered credentials on login button click', async () => {
      mockAuthenticateUser.mockResolvedValue({ success: true });

      const { getByPlaceholderText, getByText } = render(<Login />);

      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');
      const loginButton = getByText('Login');

      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'testpass' } });
      fireEvent.click(loginButton);

      expect(mockAuthenticateUser).toHaveBeenCalledWith('testuser', 'testpass');
    });

    it('should display an error message if login attempt fails', async () => {
      mockAuthenticateUser.mockRejectedValue(invalidCredentialsError);

      const { getByPlaceholderText, getByText } = render(<Login />);

      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');
      const loginButton = getByText('Login');

      fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
      fireEvent.click(loginButton);

      // Assuming the component displays the error message from the caught error
      const invalidCredentialsError = new Error('Invalid credentials');
      const errorMessage = await getByText(invalidCredentialsError.message);

      expect(errorMessage).toBeInTheDocument();
    });

  });
  ```

### 2.1.3 beforeEach

- `describe` block안에 있는 각각의 `it` 의 작동 전에 동작하는 함수
- 테스트 환경이나 테스트 케이스를 설정하는데 좋음
    
    ```jsx
    const mockFetchUser = jest.fn();
    
    jest.mock('./apiService', () => ({
      fetchUser: mockFetchUser
    }));
    
    describe('UserProfile Component', () => {
    
      // This runs before each individual test.
      beforeEach(() => {
        mockFetchUser.mockClear();
        mockFetchUser.mockResolvedValue(user);
      });
    ```
    

### 2.1.4 beforeAll

- 각 `describe` 전에 작동되는 함수
- 테스트들이 공통으로 사용하는 configuration이나 상수들을 선언하는데 활용됨
    
    ```jsx
    describe('UserProfile Component', () => {
      let user;
    
      // This runs once for this suite, before any tests are executed.
      beforeAll(() => {
        user = {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com'
        };
      });
    ```
    

### 2.1.5 afterEach

- `describe` block안에 있는 각각의 `it` 의 작동 후에 동작하는 함수
- configuration을 초기화 한다거나, mock data를 clean up 할 때 사용

### 2.1.6 afterAll

- 각 `describe` 후에 작동되는 함수
- 여러개의 `describe`에 공통으로 사용되는 것들을 초기화 하는데 좋음

  ```jsx
  // This runs once after all tests in this suite have been executed.
  afterAll(() => {
    user = null;
  });
  ```

## 2.2 Jest 설치 및 환경설정

### 2.2.1 jest 설치

```jsx
npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom
```

### 2.2.2 Jest 환경설정

```jsx
// package.json
"test": "jest --watchAll",
...
"jest": {
    "preset": "ts-jest",
    "testEnvironment": "jest-environment-jsdom",
    "testEnvironmentOptions": {
      "url": "https://wanted.byeongjinkang.com"
    }
  },
```

## 2.3 jest 테스트 코드 작성을 위한 사전세팅

- 컨벤션에 따라 다름. 각자의 장단점
    1. 테스트 하는 컴포넌트와 가까이
        1. 컴포넌트 응집도 향상
        2. 컴포넌트 소스코드 파악에 유리함
    2. `__test__` 디렉토리 생성
        1. 테스트 코드끼리 뭉쳐서 관리함 

```tsx
 // given - 회원가입 페이지가 그려짐
    const routes = [
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
      initialIndex: 0,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
```

## 2.4 jest 실패케이스 작성

```jsx
// Signup.spec.tsx

test("비밀번호와 비밀번호 확인 값이 일치하지 않으면 에러메세지가 표시된다", async () => {
    // given - 회원가입 페이지가 그려짐
    const routes = [
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
      initialIndex: 0,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
    // when - 비밀번호와 비밀번호 확인 값이 일치하지 않음

    const passwordInput = screen.getByLabelText("비밀번호");
    const confirmPasswordInput = screen.getByLabelText("비밀번호 확인");

    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "wrongPassword" },
    });

    // then - 에러메세지가 표시됨
    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });
```

## 2.5 beforeEach()활용 및 jest 성공케이스 작성

```jsx
// Signup.spec.tsx

import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SignupPage from "../pages/SignupPage";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {},
});

describe("회원가입 테스트", () => {
  beforeEach(() => {
    const routes = [
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
      initialIndex: 0,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
  });

  test("비밀번호와 비밀번호 확인 값이 일치하지 않으면 에러메세지가 표시된다", async () => {
    // given - 회원가입 페이지가 그려짐

    // when - 비밀번호와 비밀번호 확인 값이 일치하지 않음

    const passwordInput = screen.getByLabelText("비밀번호");
    const confirmPasswordInput = screen.getByLabelText("비밀번호 확인");

    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "wrongPassword" },
    });

    // then - 에러메세지가 표시됨
    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });

  test("이메일을 입력하고, 비밀번호와 비밀번호 확인값이 일치하면 회원가입 버튼이 활성화된다", async () => {
    // given - 회원가입 페이지가 그려짐
    const signupButton = screen.getByRole("button", { name: "회원가입" });
    expect(signupButton).toBeDisabled();

    // when - 이메일 입력, 비밀번호, 비밀번호 확인 일치
    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");
    const confirmPasswordInput = screen.getByLabelText("비밀번호 확인");

    fireEvent.change(emailInput, {
      target: { value: "button-activated@email.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password" },
    });

    // then - 회원가입 버튼 활성화
    expect(signupButton).toBeEnabled();
  });
});
```

## 2.6 react-query 공식문서를 따라하면 안되는 이유

### 2.6.1 react-query 테스트를 위한 패키지 설치

```bash
npm install --save-dev @testing-library/react-hooks react-test-renderer 
```

### 2.6.2 react-query 테스트 작성

- 로그인 실패 케이스
    
    ```jsx
    import "@testing-library/jest-dom";
    
    import { render, renderHook, waitFor } from "@testing-library/react";
    
    import { RouterProvider, createMemoryRouter } from "react-router-dom";
    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    import LoginPage from "../pages/LoginPage";
    
    import useLogin from "../hooks/useLogin";
    
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    
    const testWrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    
    describe("로그인 테스트", () => {
      test("로그인 실패 시 에러메시지", async () => {
        const routes = [
          {
            path: "/login",
            element: <LoginPage />,
          },
        ];
    
        const router = createMemoryRouter(routes, {
          initialEntries: ["/login"],
          initialIndex: 0,
        });
    
        render(
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        );
    
        const { result } = renderHook(() => useLogin(), {
          wrapper,
        });
    
        await waitFor(() => expect(result.current.isSuccess).toBe(false));
      });
    });
    ```
    
- 테스트 케이스는 통과하지만 사실상 그렇지 않다
    - given - when - then을 떠올려보자
        
        ```jsx
        // given - 로그인 페이지가 그려짐
        // when - 사용자가 로그인에 실패함
        // then - 로그인 에러 메세지가 화면에 나타남
        ```
        
        - 에러메세지가 보이지 않는다
            
            ```jsx
            await waitFor(async () => {
              expect(result.current.isSuccess).toBe(false);
            	// 아래 항목 추가
              const errorMessage = await screen.findByTestId("error-message");
              expect(errorMessage).toBeInTheDocument();
            });
            ```
            
    - `isSuccess`가 `false`니까 실패한 건 맞는데 왜?
        - HTTP request는 일어나지 않았고
        - 그로 인해 `isSuccess`가 `false`일 뿐 실제로 테스트가 잘 이루어진 것은 아님
    - 버튼 클릭을 테스트해보자
        
        ```jsx
        const emailInput = screen.getByLabelText("이메일");
        const passwordInput = screen.getByLabelText("비밀번호");
        
        fireEvent.change(emailInput, {
          target: { value: "wrong@email.com" },
        });
        fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
        const loginButton = screen.getByRole("button", { name: "로그인" });
        fireEvent.click(loginButton);
        ```
        
- 이제 테스트는 통과한다
    - 테스트는 통과하는데 에러메세지 발생
    - 테스트 환경에서는 `console.error()` 제거
        
        ```jsx
        const queryClient = new QueryClient({
          defaultOptions: {
            queries: {
              retry: false,
            },
          },
          logger: {
            log: console.log,
            warn: console.warn,
            // ✅ no more errors on the console for tests
            error: process.env.NODE_ENV === "test" ? () => {} : console.error,
          },
        });
        ```
        
    - 하지만 테스트코드에서 버튼을 클릭하는데, 실제 서버에 요청이 들어간다

## 2.7 nock을 활용한 HTTP Request Mocking

https://github.com/nock/nock

- 제거한 에러메세지를 돌이켜보면 `AxiosError`
    - 실제 서버에 리퀘스트가 넘어간다는 것
- HTTP request를 mocking하기 위해 사용되는 패키지
    - mocking은 가짜 데이터를 활용한다고 보면 됨
    - 로그인 실패 요청을 mocking해보자
        
        ```jsx
        nock("https://inflearn.byeongjinkang.com")
          .post(`/user/login`, {
            email: "wrong@email.com",
            password: "wrongPassword",
          })
          .reply(400, { msg: "SUCH_USER_DOES_NOT_EXIST" });
        ```