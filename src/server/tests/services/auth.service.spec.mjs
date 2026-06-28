import { jest } from '@jest/globals';

// 1. Sử dụng unstable_mockModule cho tất cả file nội bộ của bạn
jest.unstable_mockModule('../../src/models/auth.models.mjs', () => ({
    findUserByEmail: jest.fn(),
    getPendingByEmail: jest.fn(),
    deletePendingByEmail: jest.fn(),
    deletePendingByToken: jest.fn(),
    getPendingByToken: jest.fn(),
    insertUserFromPending: jest.fn(),
}));

jest.unstable_mockModule('../../src/utils/authHelpers.mjs', () => ({
    withTransaction: jest.fn(),
    replacePendingUser: jest.fn(),
    buildUserPayload: jest.fn(),
    SALT_ROUNDS: 10,
    signToken: jest.fn(),
}));

jest.unstable_mockModule('../../src/utils/mailer.mjs', () => ({
    sendVerificationEmail: jest.fn(),
}));

jest.unstable_mockModule('bcryptjs', () => ({
    default: {
        hash: jest.fn(),
        compare: jest.fn()
    }
}));

// 2. Bắt buộc phải import ĐỘNG các hàm cần gán mock sau khi mockModule đã chạy
const { findUserByEmail, getPendingByEmail, deletePendingByEmail, deletePendingByToken, getPendingByToken, insertUserFromPending } = await import('../../src/models/auth.models.mjs');
const { withTransaction, replacePendingUser, buildUserPayload, SALT_ROUNDS, signToken } = await import('../../src/utils/authHelpers.mjs');
const { sendVerificationEmail } = await import('../../src/utils/mailer.mjs');

// Import động bcryptjs (lấy thực thể default ra)
const { default: bcrypt } = await import('bcryptjs');

// 3. Import động hàm dịch vụ chính cần test
const { registerUser } = await import('../../src/services/auth.services.mjs');

describe('Auth Service - registerUser', () => {
    const mockInput = {
        email: 'dunyhat@gmail.com',
        password: 'SecurePassword123',
        username: 'duynhat_vu'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('nên gửi mail xác thực và trả về thông báo thành công khi dữ liệu hợp lệ', async () => {
        // Mọi logic bên trong giữ nguyên 100% không đổi
        findUserByEmail.mockResolvedValue(null); 
        getPendingByEmail.mockResolvedValue(null); 
        bcrypt.hash.mockResolvedValue('hashed_123'); 

        withTransaction.mockImplementation(async (callback) => callback({}));
        replacePendingUser.mockResolvedValue('mock-uuid-token-12345');
        sendVerificationEmail.mockResolvedValue(true); 

        const result = await registerUser(mockInput);

        expect(findUserByEmail).toHaveBeenCalledWith(mockInput.email);
        expect(result).toEqual({
            message: 'Verification email sent. Please check your inbox.'
        });
    });
});