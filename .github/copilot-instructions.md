
## Purpose
- C'est une plateforme de pétitions (inspirée de Change.org / MesOpinions), en fournissant du code, des revues, des tests, de la documentation et des plans clairs.


## Design Guidelines
- Ensure all UI components are responsive and work seamlessly on both small screens (mobile) and large screens (desktop)
- Use mobile-first approach when implementing responsive design
- Test layouts on various screen sizes to guarantee optimal user experience across all devices

## Development Guidelines

### Code Quality & Breaking Changes
- Always maintain backward compatibility when adding new features
- Use semantic versioning principles - increment major version only for breaking changes
- When modifying existing APIs or components, ensure existing functionality remains intact
- Add new features through extension rather than modification of existing code
- Use feature flags or gradual rollouts for significant changes
- Write comprehensive tests for new features before implementation
- Run full test suite before committing changes to catch potential regressions
- Document any changes that might affect existing implementations
- Use TypeScript strict mode to catch potential type-related breaking changes
- Implement proper error handling to prevent runtime failures
- Review dependencies and ensure updates don't introduce breaking changes

- Always prefer `type` aliases over `interface` declarations in TypeScript for better consistency and flexibility
- Use `type` for union types, intersections, and computed types
- Reserve `interface` only when declaration merging is specifically needed