1. Root Layout
     style={
        {
          '--header-height': '3.5rem', // 56px
          '--sidebar-width': '16rem', // 256px
          '--sidebar-collapsed-width': '4rem' /* 64px */,
        } as React.CSSProperties}

2. Dashboard Layout
    - this is the dashbaord frame so should be h-[100dvh] dynamic viewport height 
    - 2 rows for 2 components (header & children) grid-rows-[var(--header-height)_1fr]
    - header  would use headers height
    - children would take the rest
3. Dashboard Shell is inside Children
    - 