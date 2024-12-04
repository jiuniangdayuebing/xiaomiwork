document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');
    const errorMessage = document.getElementById('errorMessage'); // 获取错误信息提示元素

    loginButton.addEventListener('click', function (e) {
        var userId = document.getElementById('userId').value;
        var password = document.getElementById('password').value;
        var agreeCheckbox = document.getElementById('agreeCheckbox');

        // 隐藏错误消息
        errorMessage.style.display = 'none';

        // 检查是否勾选了协议
        if (!agreeCheckbox.checked) {
            alert("请先勾选已阅读并同意用户协议！");
            return false; // 阻止登录
        }

        // 检查用户名和密码是否为空
        if (userId === '' || password === '') {
            errorMessage.textContent = '用户名和密码不能为空';
            errorMessage.style.display = 'block';
            return;
        }

        // 从 localStorage 获取存储的密码
        var storedPassword = localStorage.getItem(userId);

        // 如果用户ID不存在或密码不匹配，显示错误信息
        if (!storedPassword || storedPassword !== password) {
            errorMessage.textContent = '用户名或密码错误';
            errorMessage.style.display = 'block';
        } else {
            // 登录成功，存储用户ID并跳转
            sessionStorage.setItem('userId', userId);  // 使用 sessionStorage 保存用户ID
            window.location.href = 'index2.html'; // 跳转到 index2.html
        }
    });
});
