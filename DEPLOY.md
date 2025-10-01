# Deploying Atlas to Vercel

## Quick Deploy (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Atlas MVP"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"
   - Done! Your site will be live in ~2 minutes

## Environment Variables

None needed for MVP! Everything runs on static data.

## Build Settings (Auto-detected)

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## Custom Domain (Optional)

After deployment:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Done!

## Performance

Expected Lighthouse scores:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

## Post-Deployment Checklist

- [ ] Test all 10 discipline pages
- [ ] Test 5-10 random thinker profiles
- [ ] Test "Next Thinker" button works
- [ ] Test mobile experience
- [ ] Test About page
- [ ] Share link with 3-5 people for feedback

## Monitoring

Vercel provides built-in:
- Analytics (page views, unique visitors)
- Performance monitoring
- Error tracking
- Deployment logs

Access via: https://vercel.com/dashboard

## Updates

To update content:
1. Edit JSON files in `/thinkers/` or `disciplines.json`
2. Commit and push to GitHub
3. Vercel auto-deploys new version
4. Live in ~2 minutes

## Costs

- **Vercel Hobby Plan**: FREE
  - Includes: Unlimited projects, 100GB bandwidth/month
  - Perfect for MVP and early growth

## Support

If deployment fails:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in package.json
3. Verify Node.js version compatibility

## Next Steps After Deployment

1. Set up analytics (Vercel Analytics is built-in)
2. Add Google Analytics (if desired)
3. Consider adding Sentry for error tracking
4. Monitor user behavior
5. Gather feedback
6. Iterate!

