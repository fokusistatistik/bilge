# n8n Webhook Response Template

## Respond to Webhook Node - JSON Template

### Complete User Profile Response

```json
{
  "success": true,
  "message": "User authenticated successfully",
  "timestamp": "2026-01-13T20:12:42.000Z",
  "user": {
    "id": "{{ $json.body.user.id }}",
    "email": "{{ $json.body.user.email }}",
    "name": "{{ $json.body.user.name }}",
    "image": "{{ $json.body.user.image }}",
    "provider": "{{ $json.body.provider }}",
    "emailVerified": "{{ $json.body.profile.email_verified }}",
    "locale": "{{ $json.body.profile.locale }}",
    "createdAt": "{{ $now }}",
    "lastLogin": "{{ $now }}"
  },
  "profile": {
    "institution": "",
    "department": "",
    "academicTitle": "",
    "researchArea": "",
    "phone": "",
    "country": "TR",
    "city": "",
    "isProfileComplete": false
  },
  "subscription": {
    "plan": "free",
    "credits": 10,
    "creditsUsed": 0,
    "creditsRemaining": 10,
    "planStartDate": "{{ $now }}",
    "planEndDate": null,
    "features": {
      "maxProjects": 3,
      "maxAnalysesPerMonth": 10,
      "advancedAnalytics": false,
      "prioritySupport": false,
      "apiAccess": false
    }
  },
  "settings": {
    "language": "tr",
    "theme": "light",
    "notifications": {
      "email": true,
      "push": false,
      "analysisComplete": true,
      "weeklyReport": false
    },
    "privacy": {
      "profileVisible": false,
      "shareData": false
    }
  },
  "statistics": {
    "totalProjects": 0,
    "totalAnalyses": 0,
    "totalFiles": 0,
    "totalDataPoints": 0,
    "lastActivity": "{{ $now }}"
  },
  "tokens": {
    "accessToken": "{{ $json.body.tokens.access_token }}",
    "refreshToken": "{{ $json.body.tokens.refresh_token }}",
    "expiresAt": "{{ $json.body.tokens.expires_at }}",
    "tokenType": "{{ $json.body.tokens.token_type }}"
  },
  "session": {
    "sessionId": "{{ $runIndex }}_{{ $now }}",
    "ipAddress": "{{ $json.headers['x-real-ip'] }}",
    "userAgent": "{{ $json.headers['user-agent'] }}",
    "loginMethod": "{{ $json.body.metadata.loginMethod }}",
    "environment": "{{ $json.body.metadata.environment }}"
  },
  "permissions": {
    "canCreateProject": true,
    "canUploadFile": true,
    "canRunAnalysis": true,
    "canExportData": true,
    "canShareProject": false,
    "canInviteUsers": false,
    "isAdmin": false
  },
  "onboarding": {
    "completed": false,
    "currentStep": 1,
    "totalSteps": 5,
    "steps": {
      "profileSetup": false,
      "firstProject": false,
      "firstAnalysis": false,
      "firstExport": false,
      "tutorial": false
    }
  }
}
```

---

## Simplified Response (Minimal)

```json
{
  "success": true,
  "user": {
    "id": "{{ $json.body.user.id }}",
    "email": "{{ $json.body.user.email }}",
    "name": "{{ $json.body.user.name }}",
    "image": "{{ $json.body.user.image }}"
  },
  "credits": 10,
  "plan": "free"
}
```

---

## Error Response Template

```json
{
  "success": false,
  "error": {
    "code": "AUTH_FAILED",
    "message": "Authentication failed",
    "details": "{{ $json.error }}"
  },
  "timestamp": "{{ $now }}"
}
```

---

## n8n Respond to Webhook Configuration

### Response Code: 200

### Response Headers:
```json
{
  "Content-Type": "application/json",
  "X-Request-ID": "{{ $runIndex }}",
  "X-Timestamp": "{{ $now }}"
}
```

### Response Body (use template above)

---

## Database Schema for User Profile

```sql
-- Users table
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    image TEXT,
    provider VARCHAR(50),
    email_verified BOOLEAN DEFAULT FALSE,
    locale VARCHAR(10),
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User profiles table
CREATE TABLE user_profiles (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id),
    institution VARCHAR(255),
    department VARCHAR(255),
    academic_title VARCHAR(100),
    research_area TEXT,
    phone VARCHAR(50),
    country VARCHAR(2),
    city VARCHAR(100),
    is_profile_complete BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User subscriptions table
CREATE TABLE user_subscriptions (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id),
    plan VARCHAR(50) DEFAULT 'free',
    credits INTEGER DEFAULT 10,
    credits_used INTEGER DEFAULT 0,
    plan_start_date TIMESTAMP DEFAULT NOW(),
    plan_end_date TIMESTAMP,
    max_projects INTEGER DEFAULT 3,
    max_analyses_per_month INTEGER DEFAULT 10,
    advanced_analytics BOOLEAN DEFAULT FALSE,
    priority_support BOOLEAN DEFAULT FALSE,
    api_access BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User settings table
CREATE TABLE user_settings (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id),
    language VARCHAR(10) DEFAULT 'tr',
    theme VARCHAR(20) DEFAULT 'light',
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT FALSE,
    analysis_complete_notification BOOLEAN DEFAULT TRUE,
    weekly_report BOOLEAN DEFAULT FALSE,
    profile_visible BOOLEAN DEFAULT FALSE,
    share_data BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User statistics table
CREATE TABLE user_statistics (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id),
    total_projects INTEGER DEFAULT 0,
    total_analyses INTEGER DEFAULT 0,
    total_files INTEGER DEFAULT 0,
    total_data_points BIGINT DEFAULT 0,
    last_activity TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User tokens table (encrypted)
CREATE TABLE user_tokens (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id),
    access_token TEXT NOT NULL, -- Encrypt!
    refresh_token TEXT, -- Encrypt!
    expires_at TIMESTAMP,
    token_type VARCHAR(50),
    scope TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User sessions table
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id),
    session_id VARCHAR(255) UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    login_method VARCHAR(50),
    environment VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP
);

-- User permissions table
CREATE TABLE user_permissions (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id),
    can_create_project BOOLEAN DEFAULT TRUE,
    can_upload_file BOOLEAN DEFAULT TRUE,
    can_run_analysis BOOLEAN DEFAULT TRUE,
    can_export_data BOOLEAN DEFAULT TRUE,
    can_share_project BOOLEAN DEFAULT FALSE,
    can_invite_users BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User onboarding table
CREATE TABLE user_onboarding (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id),
    completed BOOLEAN DEFAULT FALSE,
    current_step INTEGER DEFAULT 1,
    total_steps INTEGER DEFAULT 5,
    profile_setup BOOLEAN DEFAULT FALSE,
    first_project BOOLEAN DEFAULT FALSE,
    first_analysis BOOLEAN DEFAULT FALSE,
    first_export BOOLEAN DEFAULT FALSE,
    tutorial BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## n8n Workflow After Webhook

```
Webhook
    ↓
Switch (event type)
    ↓
google_oauth_tokens / user_signup_google
    ↓
1. Insert/Update User (users table)
    ↓
2. Create User Profile (user_profiles table)
    ↓
3. Create Subscription (user_subscriptions table)
    ↓
4. Create Settings (user_settings table)
    ↓
5. Create Statistics (user_statistics table)
    ↓
6. Save Tokens (user_tokens table)
    ↓
7. Create Session (user_sessions table)
    ↓
8. Create Permissions (user_permissions table)
    ↓
9. Create Onboarding (user_onboarding table)
    ↓
10. Respond to Webhook (JSON template above)
    ↓
11. Send Welcome Email (optional)
```

---

## Example Filled Response

```json
{
  "success": true,
  "message": "User authenticated successfully",
  "timestamp": "2026-01-13T20:12:42.537Z",
  "user": {
    "id": "103268293102436136997",
    "email": "emrebostanoglu@gmail.com",
    "name": "Emre Bostanoğlu",
    "image": "https://lh3.googleusercontent.com/a/ACg8ocKPKgzlr9e9AMPTiPlrc_OoW99YrYT_i4qoAQGcnkTcAXZrGfVE3w=s96-c",
    "provider": "google",
    "emailVerified": true,
    "locale": "tr",
    "createdAt": "2026-01-13T20:12:42.537Z",
    "lastLogin": "2026-01-13T20:12:42.537Z"
  },
  "profile": {
    "institution": "",
    "department": "",
    "academicTitle": "",
    "researchArea": "",
    "phone": "",
    "country": "TR",
    "city": "",
    "isProfileComplete": false
  },
  "subscription": {
    "plan": "free",
    "credits": 10,
    "creditsUsed": 0,
    "creditsRemaining": 10,
    "planStartDate": "2026-01-13T20:12:42.537Z",
    "planEndDate": null,
    "features": {
      "maxProjects": 3,
      "maxAnalysesPerMonth": 10,
      "advancedAnalytics": false,
      "prioritySupport": false,
      "apiAccess": false
    }
  },
  "settings": {
    "language": "tr",
    "theme": "light",
    "notifications": {
      "email": true,
      "push": false,
      "analysisComplete": true,
      "weeklyReport": false
    },
    "privacy": {
      "profileVisible": false,
      "shareData": false
    }
  },
  "statistics": {
    "totalProjects": 0,
    "totalAnalyses": 0,
    "totalFiles": 0,
    "totalDataPoints": 0,
    "lastActivity": "2026-01-13T20:12:42.537Z"
  },
  "tokens": {
    "accessToken": "ya29.a0AfB_byC...",
    "refreshToken": "1//0gXXX...",
    "expiresAt": 1705176762,
    "tokenType": "Bearer"
  },
  "session": {
    "sessionId": "1_1705176762537",
    "ipAddress": "195.87.37.233",
    "userAgent": "node",
    "loginMethod": "google",
    "environment": "development"
  },
  "permissions": {
    "canCreateProject": true,
    "canUploadFile": true,
    "canRunAnalysis": true,
    "canExportData": true,
    "canShareProject": false,
    "canInviteUsers": false,
    "isAdmin": false
  },
  "onboarding": {
    "completed": false,
    "currentStep": 1,
    "totalSteps": 5,
    "steps": {
      "profileSetup": false,
      "firstProject": false,
      "firstAnalysis": false,
      "firstExport": false,
      "tutorial": false
    }
  }
}
```

---

**Use this template in n8n "Respond to Webhook" node!** 🚀

