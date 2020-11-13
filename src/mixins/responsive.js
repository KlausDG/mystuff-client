export const responsive = {
    data() {
      return {
        window: {
          width: 0,
          height: 0,
        },
        screen: {
          phone: 767.98,
          tablet: 991.98,
        },
      }
    },
  
    created() {
      window.addEventListener("resize", this.handleResize);
      this.handleResize();
    },
  
    destroyed() {
      window.removeEventListener("resize", this.handleResize);
    },
  
    computed: {
      phone() {
        return this.window.width <= this.screen.phone;
      },
    },
  
    methods: {
      handleResize() {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
      },
    },
  
  }