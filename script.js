   
 
      document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // 1. مراقب الظهور التدريجي للأقسام (Intersection Observer)
    const elementsToReveal = document.querySelectorAll(".reveal-element");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: "0px 0px -10px 0px" });

    elementsToReveal.forEach(el => revealObserver.observe(el));

    // 2. معمارية الزناد الذكي لتفعيل نافذة الواتساب بعد العمل الثاني
    const secondProject = document.getElementById('second-project');
    const whatsappModal = document.getElementById('whatsapp-modal');
    const modalContent = whatsappModal.querySelector('.animated-border-static');
    const closeModal = document.getElementById('close-modal');
    let isModalTriggered = false;

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0 && !isModalTriggered) {
                whatsappModal.classList.remove('opacity-0', 'pointer-events-none');
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
                isModalTriggered = true; 
            }
        });
    }, { threshold: 0.1 });

    if (secondProject) projectObserver.observe(secondProject);

    closeModal.addEventListener('click', () => {
        whatsappModal.classList.add('opacity-0', 'pointer-events-none');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
    });

    whatsappModal.addEventListener('click', (e) => {
        if (e.target === whatsappModal) closeModal.click();
    });

    // 3. التحكم بنافذة النجاح وإرسال البيانات فعلياً
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const successModalContent = successModal.querySelector('.animated-border-static');
    const closeSuccessModal = document.getElementById('close-success-modal');
    const okCloseModal = document.getElementById('ok-close-modal');

    const hideSuccessModal = () => {
        successModal.classList.add('opacity-0', 'pointer-events-none');
        successModalContent.classList.remove('scale-100');
        successModalContent.classList.add('scale-95');
    };

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // منع الإرسال التقليدي

            const formData = new FormData(contactForm);
            
            try {
                // إرسال البيانات فعلياً لـ Formspree
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    contactForm.reset(); // تصفير الفورم
                    // إظهار نافذة النجاح
                    successModal.classList.remove('opacity-0', 'pointer-events-none');
                    successModalContent.classList.remove('scale-95');
                    successModalContent.classList.add('scale-100');
                } else {
                    alert("حدث خطأ أثناء الإرسال. الرجاء المحاولة مجدداً.");
                }
            } catch (error) {
                alert("تأكدي من اتصالك بالإنترنت.");
            }
        });
    }

    if (closeSuccessModal) closeSuccessModal.addEventListener('click', hideSuccessModal);
    if (okCloseModal) okCloseModal.addEventListener('click', hideSuccessModal);
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) hideSuccessModal();
    });

    // 4. سكريبت تثبيت الهيدر
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('shadow-2xl', 'bg-[#000212]/90');
        } else {
            header.classList.remove('shadow-2xl', 'bg-[#000212]/90');
        }
    });
});
    