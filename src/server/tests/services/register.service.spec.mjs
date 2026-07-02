import { vi } from 'vitest';
import { findUserByEmail, getPendingByEmail } from '../../src/models/auth.models.mjs';
import { withTransaction, replacePendingUser } from '../../src/utils/authHelpers.mjs';
import { sendVerificationEmail } from '../../src/utils/mailer.mjs';
import bcrypt from 'bcryptjs';
import { registerUser } from '../../src/services/auth.services.mjs';

vi.mock('../../src/models/auth.models.mjs', () => ({
    findUserByEmail: vi.fn(),
    getPendingByEmail: vi.fn(),
    deletePendingByEmail: vi.fn(),
    deletePendingByToken: vi.fn(),
    getPendingByToken: vi.fn(),
    insertUserFromPending: vi.fn(),
}));

vi.mock('../../src/utils/authHelpers.mjs', () => ({
    withTransaction: vi.fn(),
    replacePendingUser: vi.fn(),
    buildUserPayload: vi.fn(),
    SALT_ROUNDS: 10,
    signToken: vi.fn(),
}));

vi.mock('../../src/utils/mailer.mjs', () => ({
    sendVerificationEmail: vi.fn(),
}));

vi.mock('bcryptjs', () => ({
    default: {
        hash: vi.fn(),
        compare: vi.fn()
    }
}));

describe('Auth Service - registerUser', () => {
    const mockInput = {
        email: 'dunyhat@gmail.com',
        password: 'SecurePassword123',
        username: 'duynhat_vu'
    };

    beforeEach(() => {
        
        vi.clearAllMocks();
    });

    it('nên gửi mail xác thực và trả về thông báo thành công khi dữ liệu hợp lệ', async () => {

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