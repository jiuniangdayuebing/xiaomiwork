// 处理注册表单的验证和数据保存
function validateForm() {
    var userId = document.getElementById("txtID").value;
    var password = document.getElementById("txtPwd").value;
    var confirmPassword = document.getElementById("txtPwd2").value;
    var agreeCheckbox = document.getElementById("agreeCheckbox");

    // 检查是否勾选了协议
    if (!agreeCheckbox.checked) {
        alert("请先勾选已阅读并同意用户协议！");
        return false; // 阻止表单提交
    }

    // 密码验证
    if (password.length < 6) {
        alert("密码不能少于6位");
        return false;
    }

    // 密码和确认密码是否匹配
    if (password !== confirmPassword) {
        alert("密码和确认密码不匹配");
        return false;
    }

    // 保存用户信息到 localStorage
    localStorage.setItem(userId, password);

    // 提示注册成功
    alert("注册成功！");

    // 注册成功后跳转到登录页面（你可以修改为跳转到其他页面）
    window.location.href = "login.html"; // 假设你有一个登录页面

    return false;  // 阻止表单的默认提交行为
}

// 动态检查小米ID是否已注册
document.getElementById("txtID").addEventListener("input", function() {
    var userId = this.value;
    var existingUserId = localStorage.getItem(userId); // 获取 localStorage 中是否存在该用户ID

    var errorMessage = document.getElementById("errorMessage");
    var registerBtn = document.getElementById("registerBtn");

    if (existingUserId) {
        // 如果小米ID已注册，显示提示信息并禁用注册按钮
        errorMessage.style.display = "block";
        registerBtn.disabled = true;
    } else {
        // 如果小米ID未注册，隐藏提示信息并启用注册按钮
        errorMessage.style.display = "none";
        registerBtn.disabled = false;
    }
});
