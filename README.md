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